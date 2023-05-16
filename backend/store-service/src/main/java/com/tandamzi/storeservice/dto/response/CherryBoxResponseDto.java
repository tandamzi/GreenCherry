package com.tandamzi.storeservice.dto.response;

import com.tandamzi.storeservice.domain.CherryBox;
import lombok.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class CherryBoxResponseDto {
    private Long id;
    private int quantity;
    private int totalPriceBeforeDiscount;
    private int priceBeforeDiscount;
    private double discountRate;
    private String description;
    private int pricePerCherryBox;

    public static CherryBoxResponseDto create(CherryBox cherryBox) {
        return CherryBoxResponseDto.builder()
                .id(cherryBox.getId())
                .quantity(cherryBox.getQuantity())
                .totalPriceBeforeDiscount(cherryBox.getTotalPriceBeforeDiscount())
                .discountRate(cherryBox.getDiscountRate())
                .priceBeforeDiscount(cherryBox.getPriceBeforeDiscount())
                .description(cherryBox.getDescription())
                .pricePerCherryBox(cherryBox.getPricePerCherryBox())
                .build();
    }
}
