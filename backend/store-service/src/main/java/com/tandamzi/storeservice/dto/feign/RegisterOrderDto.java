package com.tandamzi.storeservice.dto.feign;

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
