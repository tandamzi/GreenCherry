package com.tandamzi.orderservice.dto.response;

import com.tandamzi.orderservice.domain.Order;
import lombok.*;

import java.time.LocalDateTime;
import java.util.HashMap;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@ToString
public class OrderListResponseDto  {
    private Long orderId;
    private String nickname;
    private int quantity;
    private String orderState;
    private int totalSalesAmount;
    private LocalDateTime orderDate;

    public static OrderListResponseDto create(Order order, HashMap<Long, String> map){
        return OrderListResponseDto.builder()
                .orderId(order.getId())
                .orderDate(order.getCreateDate())
                .orderState(String.valueOf(order.getState()))
                .totalSalesAmount(order.getTotalSalesAmount())
                .quantity(order.getQuantity())
                .nickname(map.get(order.getMemberId()))
                .build();
    }


}
