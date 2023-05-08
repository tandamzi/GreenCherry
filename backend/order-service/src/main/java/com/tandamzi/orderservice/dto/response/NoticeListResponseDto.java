package com.tandamzi.orderservice.dto.response;

import com.tandamzi.orderservice.domain.Order;
import com.tandamzi.orderservice.dto.StoreInfoForOrderDto;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@ToString
public class NoticeListResponseDto {
    private Long orderId;
    private String storeName;
    private int quantity;
    private String orderState;
    private int totalSalesAmount;
    private LocalDateTime orderDate;
    private String writed;
    private Long memberId;
    private Long storeId;

    public static NoticeListResponseDto create(Order order, StoreInfoForOrderDto storeInfo, String writed){
        return NoticeListResponseDto.builder()
                .orderId(order.getId())
                .storeName(storeInfo.getName())
                .quantity(order.getQuantity())
                .orderState(String.valueOf(order.getState()))
                .totalSalesAmount(order.getTotalSalesAmount())
                .orderDate(order.getCreateDate())
                .writed(writed)
                .memberId(order.getMemberId())
                .storeId(order.getStoreId())
                .build();

    }
}
