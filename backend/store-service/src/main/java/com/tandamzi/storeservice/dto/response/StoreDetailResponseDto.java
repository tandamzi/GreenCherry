package com.tandamzi.storeservice.dto.response;

import com.tandamzi.storeservice.domain.*;
import lombok.*;
import org.jetbrains.annotations.NotNull;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class StoreDetailResponseDto {
    private Long storeId;
    private String name;
    private Long memberId;
    private TypeInfoDto type;
    private AddressDto address;
    private String phone;
    private String description;
    private String snsAccount;
    private LocalTime pickUpStartTime;
    private LocalTime pickUpEndTime;
    private int cherryPoint;
    private boolean open;
    private CherryBoxDto cherryBox;
    private List<AllergyDto> allergies;
    private List<StoreImageDto> images;
    private long numberOfReview;
    private long numberOfSubscriber;

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    @AllArgsConstructor
    @Builder
    private static class StoreImageDto {
        private Long id;
        private String url;
    }

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    @AllArgsConstructor
    @Builder
    private static class AllergyDto {
        private Long id;
        private String name;
    }

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    @AllArgsConstructor
    @Builder
    private static class TypeInfoDto {
        private Long id;
        private String name;
    }

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    @AllArgsConstructor
    @Builder
    private static class AddressDto {
        private String addressName;
        private double lat;
        private double lng;
    }

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    @AllArgsConstructor
    @Builder
    private static class CherryBoxDto {
        private String description;
        private int totalPriceBeforeDiscount;
        private int quantity;
        private double discountRate;
        private int pricePerCherryBox;

    }

    public static StoreDetailResponseDto create(Store store, List<Allergy> allergyList, List<StoreImage> images,long numberOfReview, long numberOfSubscriber) {
        return StoreDetailResponseDto
                .builder()
                .storeId(store.getId())
                .name(store.getName())
                .memberId(store.getMemberId())
                .snsAccount(store.getSnsAccount())
                .description(store.getDescription())
                .type(getTypeBuilder(store))
                .address(getAddressBuilder(store))
                .phone(store.getPhone())
                .cherryPoint(store.getCherryPoint())
                .pickUpStartTime(store.getPickUpStartTime())
                .pickUpEndTime(store.getPickUpEndTime())
                .open(store.isOpen())
                .cherryBox(getCherryBoxBuilder(store))
                .allergies(getAllergiesBuilder(allergyList))
                .images(getImagesBuilder(images))
                .numberOfReview(numberOfReview)
                .numberOfSubscriber(numberOfSubscriber)
                .build();
    }

    private static TypeInfoDto getTypeBuilder(Store store) {
        return TypeInfoDto.builder()
                .id(store.getType().getId())
                .name(store.getType().getName())
                .build();
    }

    private static AddressDto getAddressBuilder(Store store) {
        return AddressDto.builder()
                .addressName(store.getAddress().getAddressName())
                .lat(store.getAddress().getLat())
                .lng(store.getAddress().getLng())
                .build();
    }

    private static CherryBoxDto getCherryBoxBuilder(Store store) {
        return CherryBoxDto.builder()
                .description(store.getCherryBox().getDescription())
                .totalPriceBeforeDiscount(store.getCherryBox().getTotalPriceBeforeDiscount())
                .quantity(store.getCherryBox().getQuantity())
                .discountRate(store.getCherryBox().getDiscountRate())
                .pricePerCherryBox(store.getCherryBox().getPricePerCherryBox())
                .build();
    }

    @NotNull
    private static List<StoreImageDto> getImagesBuilder(List<StoreImage> images) {
        return images != null ? images.stream()
                .map(image -> StoreImageDto.builder()
                        .id(image.getId())
                        .url(image.getUrl())
                        .build())
                .collect(Collectors.toList()) : Collections.emptyList();
    }

    @NotNull
    private static List<AllergyDto> getAllergiesBuilder(List<Allergy> allergyList) {
        return allergyList != null ? allergyList.stream()
                .map(allergy -> AllergyDto.builder()
                        .id(allergy.getId())
                        .name(allergy.getName())
                        .build())
                .collect(Collectors.toList()) : Collections.emptyList();
    }


}
