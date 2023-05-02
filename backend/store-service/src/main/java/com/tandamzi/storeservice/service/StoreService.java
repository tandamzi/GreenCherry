package com.tandamzi.storeservice.service;

import com.tandamzi.storeservice.domain.*;
import com.tandamzi.storeservice.dto.request.CherryBoxRequestDto;
import com.tandamzi.storeservice.dto.request.RegisterStoreRequestDto;
import com.tandamzi.storeservice.dto.request.UpdateStoreRequestDto;
import com.tandamzi.storeservice.dto.response.*;
import com.tandamzi.storeservice.exception.StoreNotFoundException;
import com.tandamzi.storeservice.exception.TypeNotFoundException;
import com.tandamzi.storeservice.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
        List<Allergy> allergyList = allergyRepository.findAllById(dto.getAllergyIdList());
        allergyList.stream().forEach(allergy -> {
            storeAllergyRepository.save(StoreAllergy.builder()
                    .store(store)
                    .allergy(allergy)
                    .build()
            );
        });
    }

    public StoreDetailResponseDto getStoreDetail(Long storeId) {
        Store store = storeRepository.findByIdWithEagerTypeAndBox(storeId).orElseThrow(StoreNotFoundException::new);
        log.info("store: {}", store);

        List<Allergy> allergyList = getAllergiesToList(store);
        List<StoreImage> storeImageList = storeImageRepository.findStoreImagesByStore(store);

        return StoreDetailResponseDto.create(store, allergyList, storeImageList);
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
        CherryBox cherryBox = store.getCherryBox();
        cherryBox.updateCherryBox(
                dto.getQuantity(),
                dto.getTotalPriceBeforeDiscount(),
                dto.getDiscountRate(),
                dto.getDescription(),
                dto.getPricePerCherryBox()
        );
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
    /**[주문하기용] 가게 상세 조회 */
    @Transactional
    public StoreDetailforOrderResponseDto storeDetailforOrder(Long storeId){
        log.info("[StoreService] storeDetailforOrder");
        Store store = storeRepository.findByIdLockWithCherryBox(storeId).orElseThrow(StoreNotFoundException::new);
        log.info("store : {}", store);

        return StoreDetailforOrderResponseDto.create(store);

    }

}
