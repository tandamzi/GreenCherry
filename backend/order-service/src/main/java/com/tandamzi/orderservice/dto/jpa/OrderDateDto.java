package com.tandamzi.orderservice.dto.jpa;

import lombok.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@ToString
public class OrderDateDto {
    private Long count;
    private Long totalSalesAmount;


}
