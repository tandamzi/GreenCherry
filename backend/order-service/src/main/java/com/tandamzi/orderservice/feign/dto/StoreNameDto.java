package com.tandamzi.orderservice.feign.dto;

import lombok.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class StoreNameDto {

    private Long storeId;
    private String name;

}
