package com.tandamzi.storeservice.dto.response;

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
