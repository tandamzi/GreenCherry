package com.tandamzi.orderservice.dto.response;

import com.tandamzi.orderservice.domain.State;
import lombok.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@ToString
public class OrderDetailResponseDto {
    private Long orderId;
    private String name;
    private String orderState;
    private int quantity;
    private int totalSalesAmount;
}
