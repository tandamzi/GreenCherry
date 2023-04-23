package com.tandamzi.storeservice.service;

import com.tandamzi.storeservice.domain.*;
import com.tandamzi.storeservice.dto.request.RegisterStoreRequestDto;
import com.tandamzi.storeservice.exception.TypeNotFoundException;
import com.tandamzi.storeservice.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

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

    @Transactional
    public void registerStore(RegisterStoreRequestDto dto) {
        //타입 id로 타입 찾아서 toEntity로 변환
        Type type = typeRepository.findById(dto.getTypeId()).orElseThrow(TypeNotFoundException::new);
        Store store = storeRepository.save(dto.toEntity(type));


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
}
