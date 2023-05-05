package com.tandamzi.orderservice.dto;

import lombok.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class StoreInfoForOrderDto {
    private Long storeId;
    private String name;
    private boolean open;

}
