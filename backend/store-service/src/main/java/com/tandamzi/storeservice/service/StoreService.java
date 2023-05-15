package com.tandamzi.storeservice.service;

import com.tandamzi.storeservice.communication.feign.MemberServiceClient;
import com.tandamzi.storeservice.communication.feign.ReviewServiceClient;
import com.tandamzi.storeservice.communication.kafka.KafkaProducer;
import com.tandamzi.storeservice.domain.*;
import com.tandamzi.storeservice.dto.feign.RegisterOrderDto;
import com.tandamzi.storeservice.dto.feign.StoreDetailforOrderResponseDto;
import com.tandamzi.storeservice.dto.feign.StoreImageQueryDto;
import com.tandamzi.storeservice.dto.feign.StoreInfoForOrderDto;
import com.tandamzi.storeservice.dto.kafka.CherryBoxNotificationDto;
import com.tandamzi.storeservice.dto.request.CherryBoxRequestDto;
import com.tandamzi.storeservice.dto.request.RegisterStoreRequestDto;
import com.tandamzi.storeservice.dto.request.UpdateStoreRequestDto;
import com.tandamzi.storeservice.dto.response.*;
import com.tandamzi.storeservice.exception.CherryBoxQuantityInsufficientException;
import com.tandamzi.storeservice.exception.StoreNotFoundException;
import com.tandamzi.storeservice.exception.StoreNotOpenException;
import com.tandamzi.storeservice.exception.TypeNotFoundException;
import com.tandamzi.storeservice.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class StoreService {
    private final StoreRepository storeRepository;
    private final TypeRepository typeRepository;
    private final StoreAllergyRepository storeAllergyRepository;
    private final AllergyRepository allergyRepository;
    private final StoreImageRepository storeImageRepository;
    private final SubscribeRepository subscribeRepository;
    private final CherryBoxRepository cherryBoxRepository;
    private final S3Service s3Service;
    private final CherryBoxService cherryBoxService;
    private final MemberServiceClient memberServiceClient;
    private final ReviewServiceClient reviewServiceClient;
    private final KafkaProducer kafkaProducer;
    @Transactional
    public void registerStore(RegisterStoreRequestDto dto, List<MultipartFile> imageFileList) throws IOException {
        Type type = typeRepository.findById(dto.getTypeId()).orElseThrow(TypeNotFoundException::new);
        CherryBox cherryBox = cherryBoxRepository.save(CherryBox.builder().build());
        Store store = storeRepository.save(dto.toEntity(type, cherryBox));
        registerStoreAllergy(dto, store);
        List<String> imageUrlList = s3Service.uploadFiles(imageFileList,"store");
        registerImageUrl(store, imageUrlList);

        log.info("store = {}", store);
        log.info("imageUrlList = {}", imageUrlList);
    }

    private void registerImageUrl(Store store, List<String> imageUrlList) {
        imageUrlList.stream().forEach(imageUrl -> {
            storeImageRepository.save(StoreImage.builder()
                    .store(store)
                    .url(imageUrl)
                    .build());
        });
    }

    @Transactional
    public void registerStoreAllergy(RegisterStoreRequestDto dto, Store store) {
        if(dto.getAllergyIdList() == null || dto.getAllergyIdList().isEmpty()) return;
        List<Allergy> allergyList = allergyRepository.findAllById(dto.getAllergyIdList());
        allergyList.stream().forEach(allergy -> {
            storeAllergyRepository.save(StoreAllergy.builder()
                    .store(store)
                    .allergy(allergy)
                    .build()
            );
        });
    }

    public StoreDetailResponseDto getStoreDetail(Long storeId,Long memberId) {
        Store store = storeRepository.findStoreByIdAndMember(memberId,storeId).orElseThrow(StoreNotFoundException::new);
        log.info("store: {}", store);

        List<Allergy> allergyList = getAllergiesToList(store);
        List<StoreImage> storeImageList = storeImageRepository.findStoreImagesByStore(store);
        long numberOfReview = getNumberOfReviewFromReviewService(store.getId());
        long numberOfSubscriber = subscribeRepository.countByStoreId(store.getId());
        log.info("numberOfReview: {}", numberOfReview);

        return StoreDetailResponseDto.create(store, allergyList, storeImageList,numberOfReview,numberOfSubscriber);
    }

    private Long getNumberOfReviewFromReviewService(Long storeId) {
        return reviewServiceClient.countReview(storeId).getData();
    }

    private List<Allergy> getAllergiesToList(Store store) {
        List<Allergy> allergyList =
                storeAllergyRepository.findAllByStore(store)
                        .stream()
                        .map(storeAllergy -> storeAllergy.getAllergy())
                        .collect(Collectors.toList());
        return allergyList;
    }

    public List<TypeResponseDto> getTypes() {
        List<Type> typeList = typeRepository.findAll();
        return typeList.stream().map(type -> TypeResponseDto.create(type)).collect(Collectors.toList());
    }

    public List<AllergyResponseDto> getAllergies() {
        List<Allergy> allergyList = allergyRepository.findAll();
        return allergyList.stream().map(allergy -> AllergyResponseDto.create(allergy)).collect(Collectors.toList());
    }

    @Transactional
    public void updateCherryBox(Long storeId, CherryBoxRequestDto dto) {
        Store store = storeRepository.findByIdWithCherryBox(storeId).orElseThrow(StoreNotFoundException::new);
        store.openStoreWhenUpdatedCherryBox();
        CherryBox cherryBox = store.getCherryBox();
        cherryBox.updateCherryBox(
                dto.getQuantity(),
                dto.getTotalPriceBeforeDiscount(),
                dto.getDiscountRate(),
                dto.getPricePerCherryBox()
        );

        //cherryBox를 업데이트한 가게의 구독자들의 memberId를 memberServiceClient의 getEndpoints()에 쿼리파라미터로 보낸다
        List<Long> subscribers = getSubscribers(store);
        List<String> endpointList = memberServiceClient.getTokens(subscribers).getData();
        log.info("subscribers = {}", subscribers);
        log.info("endpoints = {}", endpointList);

        //비동기로 카프카요청
        kafkaProducer.send("cherrybox-register-notification",
                CherryBoxNotificationDto.builder()
                        .storeId(store.getId())
                        .storeName(store.getName())
                        .endpointList(endpointList)
                        .build());
    }

    private List<Long> getSubscribers(Store store) {
        return subscribeRepository.findAllByStore(store).stream()
                .map(subscribe -> subscribe.getMemberId())
                .collect(Collectors.toList());
    }

    public CherryBoxResponseDto getCherryBox(Long storeId) {
        Store store = storeRepository.findById(storeId).orElseThrow(StoreNotFoundException::new);
        CherryBox cherryBox = store.getCherryBox();
        return CherryBoxResponseDto.create(cherryBox);
    }

    @Transactional
    public void subscribeStore(Long storeId, Long memberId) {
        Store store = storeRepository.findById(storeId).orElseThrow(StoreNotFoundException::new);
        subscribeRepository.save(Subscribe.builder()
                .store(store)
                .memberId(memberId)
                .build());
    }

    @Transactional
    public void deleteSubscribe(Long storeId, Long memberId) {
        Store store = storeRepository.findById(storeId).orElseThrow(StoreNotFoundException::new);
        subscribeRepository.deleteByStoreAndMemberId(store, memberId);
    }

    @Transactional
    public void updateStoreAndImage(Long storeId, UpdateStoreRequestDto dto, List<MultipartFile> imageFileList) throws IOException {
        Store store = storeRepository.findById(storeId).orElseThrow(StoreNotFoundException::new);
        if (dto != null) {
            updateStore(dto, store);
        }
        if (imageFileList != null) {
            updateStoreImage(imageFileList, store);
        }
    }

    @Transactional
    public void updateStoreImage(List<MultipartFile> imageFileList, Store store) throws IOException {
        storeImageRepository.deleteStoreImagesByStore(store);
        List<String> imageUrlList = s3Service.uploadFiles(imageFileList, "store");
        registerImageUrl(store, imageUrlList);
    }

    @Transactional
    public void updateStore(UpdateStoreRequestDto dto, Store store) {
        store.updateStore(dto.getStoreDescription(),
                dto.getPickUpStartTime(),
                dto.getPickUpEndTime(),
                dto.getSnsAccount());
        store.getCherryBox().updateDescription(dto.getCherryBoxDescription());
    }

    public Page<StoreResponseDto> getStores(Long memberId, double radius, double lat, double lng, boolean sub, Pageable pageable) {
        Page<Store> stores = storeRepository.findNearbyPlacesWithSubscription(memberId, radius, lat, lng, sub, pageable);

        Page<StoreResponseDto> storeResponseDtoPage = stores.map(store -> StoreResponseDto.builder()
                .id(store.getId())
                .name(store.getName())
                .address(AddressResponseDto.create(store.getAddress()))
                .type(TypeResponseDto.create(store.getType()))
                .images(storeImageRepository.findStoreImagesByStore(store).stream()
                        .map(storeImage -> storeImage.getUrl())
                        .collect(Collectors.toList()))
                .numberOfReview(getNumberOfReviewFromReviewService(store.getId()))
                .build());
        return storeResponseDtoPage;
    }

    /**[주문하기용] 가게 상세 조회 */
    @Transactional
    public StoreDetailforOrderResponseDto storeDetailforOrder(RegisterOrderDto orderDto){
        log.info("[StoreService] storeDetailforOrder");
        Store store = storeRepository.findByIdLockWithCherryBox(orderDto.getStoreId()).orElseThrow(StoreNotFoundException::new);

        if(!store.isOpen()){
            throw new StoreNotOpenException();
        }

        if(orderDto.getOrderQuantity()> store.getCherryBox().getQuantity()){
            throw new CherryBoxQuantityInsufficientException();
        }

        int totalSalesAmount = orderDto.getOrderQuantity() * store.getCherryBox().getPricePerCherryBox();

        cherryBoxService.decreaseCherryBox(store.getId(), orderDto.getOrderQuantity());

        return StoreDetailforOrderResponseDto.create(store,totalSalesAmount);

    }

    public List<StoreInfoForOrderDto> storeInfoForOrder(List<Long> storeId){
        log.info("[StoreService] storeInfoForOrder");
        List<StoreImageQueryDto> storeImgs = storeImageRepository.findByStoreIds(storeId);
        return storeImgs.stream()
                .map(storeImage ->
                        StoreInfoForOrderDto.create(storeImage))
                .collect(Collectors.toList());
    }

    @Transactional
    public void toggleStore(Long storeId) {
        Store store = storeRepository.findById(storeId).orElseThrow(StoreNotFoundException::new);
        store.toggleOpen();
    }

    public Page<SubScribedStoreResponseDto> getSubScribedStore(Long memberId,Pageable pageable){
        //멤버id로 구독한 가게 목록 가져와서. dto로 변환
        Page<Subscribe> subscribePage = subscribeRepository.findAllByMemberId(memberId, pageable);
        if(!subscribePage.isEmpty()){}
        Page<SubScribedStoreResponseDto> subscribeDtoPage = subscribePage.map(entity -> SubScribedStoreResponseDto.builder()
                .id(entity.getStore().getId())
                .type(entity.getStore().getType().getName())
                .name(entity.getStore().getName())
                .open(entity.getStore().isOpen())
                .pickUpStartTime(entity.getStore().getPickUpStartTime())
                .pickUpEndTime(entity.getStore().getPickUpEndTime())
                .quantity(entity.getStore().getCherryBox().getQuantity())
                .image(storeImageRepository.findTopByStore(entity.getStore()).isPresent() ?
                        storeImageRepository.findTopByStore(entity.getStore()).get().getUrl() : null)
                .build());

        return subscribeDtoPage;
    }

    public Integer getCherryPoint(Long storeId) {
        Store store = storeRepository.findById(storeId).orElseThrow(StoreNotFoundException::new);
        return store.getCherryPoint();
    }

    public Boolean isSubscribedStore(Long memberId, Long storeId) {
        return subscribeRepository.findByMemberIdAndStoreId(memberId, storeId).isPresent();
    }
}
