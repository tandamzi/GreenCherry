package com.tandamzi.orderservice.dto.response;

import lombok.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class StoreDetailforOrderResponseDto {
    private Long storeId;
    private String name;
    private int cherryPoint;
    private boolean open;
    private CherryBoxDto cherryBox;


    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    @AllArgsConstructor
    @Builder
    public static class CherryBoxDto {
        private int totalPriceBeforeDiscount;
        private int quantity;
        private double discountRate;
        private int pricePerCherryBox;
    }

}
