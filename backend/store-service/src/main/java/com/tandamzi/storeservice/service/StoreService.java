package com.tandamzi.storeservice.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.tandamzi.storeservice.domain.*;
import com.tandamzi.storeservice.dto.request.CherryBoxRequestDto;
import com.tandamzi.storeservice.dto.request.RegisterStoreRequestDto;
import com.tandamzi.storeservice.dto.request.UpdateStoreRequestDto;
import com.tandamzi.storeservice.dto.response.AllergyResponseDto;
import com.tandamzi.storeservice.dto.response.CherryBoxResponseDto;
import com.tandamzi.storeservice.dto.response.StoreDetailResponseDto;
import com.tandamzi.storeservice.dto.response.TypeResponseDto;
import com.tandamzi.storeservice.exception.CherryBoxNotFoundException;
import com.tandamzi.storeservice.exception.CherryBoxQuantityInsufficientException;
import com.tandamzi.storeservice.exception.StoreNotFoundException;
import com.tandamzi.storeservice.exception.TypeNotFoundException;
import com.tandamzi.storeservice.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
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
        //타입 id로 타입 찾아서 entity로 변환
        Type type = typeRepository.findById(dto.getTypeId()).orElseThrow(TypeNotFoundException::new);
        CherryBox cherryBox = cherryBoxRepository.save(CherryBox.builder().build());
        Store store = storeRepository.save(dto.toEntity(type, cherryBox));
        log.info("store = {}", store);

        //allergyIdList에서 알러지 찾아서 entity로 변환
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
        List<String> imageUrlList = s3Service.uploadFiles(imageFileList,"store");
        log.info("imageUrlList = {}", imageUrlList);

        imageUrlList.stream().forEach(imageUrl -> {
            storeImageRepository.save(StoreImage.builder()
                    .store(store)
                    .url(imageUrl)
                    .build());
        });
    }

    public StoreDetailResponseDto getStoreDetail(Long storeId) {
        Store store = storeRepository.findByIdWithEagerTypeAndBox(storeId).orElseThrow(StoreNotFoundException::new);
        log.info("store: {}", store);

        List<Allergy> allergyList =
                storeAllergyRepository.findAllByStore(store)
                        .stream()
                        .map(storeAllergy -> storeAllergy.getAllergy())
                        .collect(Collectors.toList());
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
    public void updateCherryBox(Long storeId, CherryBoxRequestDto dto) {
        Store store = storeRepository.findByIdWithCherryBox(storeId).orElseThrow(StoreNotFoundException::new);
        CherryBox cherryBox = store.getCherryBox();
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
    public void updateStore(Long storeId,UpdateStoreRequestDto dto, List<MultipartFile> imageFileList) throws IOException {
        Store store = storeRepository.findById(storeId).orElseThrow(StoreNotFoundException::new);

        if (dto != null) {
            store.updateStore(dto.getStoreDescription(),
                    dto.getPickUpStartTime(),
                    dto.getPickUpEndTime(),
                    dto.getSnsAccount());
            store.getCherryBox().updateDescription(dto.getCherryBoxDescription());
        }

        if (imageFileList != null) {
            storeImageRepository.deleteStoreImagesByStore(store);
            List<String> imageUrlList = s3Service.uploadFiles(imageFileList, "store");
            imageUrlList.stream().forEach(imageUrl -> {
                storeImageRepository.save(StoreImage.builder()
                        .store(store)
                        .url(imageUrl)
                        .build());
            });
        }
    }
}