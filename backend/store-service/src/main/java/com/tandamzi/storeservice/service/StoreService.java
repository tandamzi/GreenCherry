package com.tandamzi.storeservice.service;

import com.tandamzi.storeservice.domain.*;
import com.tandamzi.storeservice.dto.request.CherryBoxRequestDto;
import com.tandamzi.storeservice.dto.request.RegisterStoreRequestDto;
import com.tandamzi.storeservice.dto.response.AllergyResponseDto;
import com.tandamzi.storeservice.dto.response.CherryBoxResponseDto;
import com.tandamzi.storeservice.dto.response.StoreDetailResponseDto;
import com.tandamzi.storeservice.dto.response.TypeResponseDto;
import com.tandamzi.storeservice.exception.CherryBoxNotFoundException;
import com.tandamzi.storeservice.exception.StoreNotFoundException;
import com.tandamzi.storeservice.exception.TypeNotFoundException;
import com.tandamzi.storeservice.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    @Transactional
    public void registerStore(RegisterStoreRequestDto dto) {
        //타입 id로 타입 찾아서 toEntity로 변환
        Type type = typeRepository.findById(dto.getTypeId()).orElseThrow(TypeNotFoundException::new);
        CherryBox cherryBox = cherryBoxRepository.save(CherryBox.builder().build());
        Store store = storeRepository.save(dto.toEntity(type, cherryBox));
        log.info("store = {}", store);


        //allergyIdList에서 알러지 찾아서 toEntity로 변환
        //1.allergyIdList를 각각 Allergy 엔티티로 생성
        //2.StoreAlergy에 store와 allergy를 넣어서 저장
        List<Allergy> allergyList = allergyRepository.findAllById(dto.getAllergyIdList());
        allergyList.stream().forEach(allergy -> {
            storeAllergyRepository.save(StoreAllergy.builder()
                    .store(store)
                    .allergy(allergy)
                    .build()
            );
        });


        //imageUrlList를 각각 StoreImage 엔티티로 생성
        dto.getImageUrlList().stream().forEach(imageUrl -> {
            storeImageRepository.save(StoreImage.builder()
                    .store(store)
                    .url(imageUrl)
                    .build()
            );
        });
    }

    public StoreDetailResponseDto getStoreDetail(Long storeId) {
        Store store = storeRepository.findByIdWithEagerTypeAndBox(storeId).orElseThrow(StoreNotFoundException::new);
        log.info("store: {}", store);
        //list<Allergy>로 변환
        List<Allergy> allergyList =
                storeAllergyRepository.findAllByStore(store)
                        .stream()
                        .map(storeAllergy -> storeAllergy.getAllergy())
                        .collect(Collectors.toList());
        //List<StoreImage>가져오기
        List<StoreImage> storeImageList = storeImageRepository.findStoreImagesByStore(store);

        return StoreDetailResponseDto.create(store, allergyList, storeImageList);
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
    public void registerCherryBox(Long storeId, CherryBoxRequestDto dto) {
        Store store = storeRepository.findById(storeId).orElseThrow(StoreNotFoundException::new);
        CherryBox cherryBox = cherryBoxRepository.findById(store.getCherryBox().getId()).orElseThrow(CherryBoxNotFoundException::new);
        cherryBox.updateCherryBox(dto.getQuantity(),
                dto.getTotalPriceBeforeDiscount(),
                dto.getDiscountRate(),
                dto.getDescription(),
                dto.getPricePerCherryBox());
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
    public void updateCherryBox(Long storeId){

    }
}
