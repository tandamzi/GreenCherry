package com.tandamzi.orderservice.dto;

import lombok.*;

import java.io.Serializable;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@ToString
public class OrderStatusDto implements Serializable {
    private Long memberId;
    private Long storeId;
    private int cherryPoint;

}
