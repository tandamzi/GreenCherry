package com.tandamzi.storeservice.dto.request;

import com.tandamzi.storeservice.domain.CherryBox;
import lombok.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@ToString
public class CherryBoxRequestDto {
    private Long memberId;
    private int quantity;
    private int totalPriceBeforeDiscount;
    private double discountRate;
    private String description;
    private int pricePerCherryBox;



}
