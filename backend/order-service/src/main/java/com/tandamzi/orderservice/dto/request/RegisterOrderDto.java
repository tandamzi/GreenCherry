package com.tandamzi.orderservice.dto.request;

import lombok.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class RegisterOrderDto {
    private Long storeId;
    private Long memberId;
    private int orderQuantity;
}
