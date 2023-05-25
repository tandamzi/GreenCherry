package com.tandamzi.orderservice.dto;

import lombok.*;

import java.io.Serializable;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@ToString
public class OrderStatusDto implements Serializable {
    private Long orderId;
    private Long memberId;
    private Long storeId;
    private String storeName;
    private int cherryPoint;
    private int quentity;
    private int totalSalesAmount;

}
