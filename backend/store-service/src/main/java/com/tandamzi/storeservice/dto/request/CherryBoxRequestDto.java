package com.tandamzi.storeservice.dto.request;

import lombok.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@ToString
public class CherryBoxRequestDto {
    private int quantity;
    private int totalPriceBeforeDiscount;
    private double discountRate;
    private int priceAfterDiscount;
}
