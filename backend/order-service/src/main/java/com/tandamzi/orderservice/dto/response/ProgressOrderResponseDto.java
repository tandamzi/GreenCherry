package com.tandamzi.orderservice.dto.response;

import com.tandamzi.orderservice.domain.Order;
import lombok.*;

import java.util.HashMap;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@ToString
public class ProgressOrderResponseDto {
    private Long orderId;
    private String storeName;
    private int quantity;
    private int totalSalesAmount;

    public static ProgressOrderResponseDto create(Order order, HashMap<Long, String> storeNames){
        return ProgressOrderResponseDto.builder()
                .orderId(order.getId())
                .storeName(storeNames.get(order.getStoreId()))
                .quantity(order.getQuantity())
                .totalSalesAmount(order.getTotalSalesAmount())
                .build();
    }
}
