package com.tandamzi.storeservice.dto.feign;

import com.tandamzi.storeservice.domain.Store;
import lombok.*;


@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class StoreDetailforOrderResponseDto {
    private Long storeId;
    private Long ownerId;
    private String name;
    private int cherryPoint;
    private boolean open;
    private CherryBoxDto cherryBox;
    private int totalSalesAmount;


    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    @AllArgsConstructor
    @Builder
    private static class CherryBoxDto {
        private int totalPriceBeforeDiscount;
        private int quantity;
        private double discountRate;
        private int priceAfterDiscount;
    }

    public static StoreDetailforOrderResponseDto create(Store store, int totalSalesAmount) {
        return StoreDetailforOrderResponseDto.builder()
                .storeId(store.getId())
                .ownerId(store.getMemberId())
                .name(store.getName())
                .cherryPoint(store.getCherryPoint())
                .open(store.isOpen())
                .cherryBox(CherryBoxDto.builder()
                        .totalPriceBeforeDiscount(store.getCherryBox().getTotalPriceBeforeDiscount())
                        .quantity(store.getCherryBox().getQuantity())
                        .discountRate(store.getCherryBox().getDiscountRate())
                        .priceAfterDiscount(store.getCherryBox().getPriceAfterDiscount())
                        .build())
                .totalSalesAmount(totalSalesAmount)
                .build();

    }
}
