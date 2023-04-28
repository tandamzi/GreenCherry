package com.tandamzi.orderservice.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@ToString
public class StoreDetailResponseDto {
    private Long storeId;
    private String name;
    private Long ownerId;
    private TypeInfoDto type;
    private AddressDto address;
    private String phone;
    private LocalTime pickUpStartTime;
    private LocalTime pickUpEndTime;
    private int cherryPoint;
    private boolean open;
    private CherryBoxDto cherryBox;
    private List<AllergyDto> allergies = new ArrayList<>();
    private List<StoreImageDto> images = new ArrayList<>();



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
    public static class CherryBoxDto {
        private String description;
        private int totalPriceBeforeDiscount;
        private int quantity;
        private double discountRate;
        private int pricePerCherryBox;
    }
}
