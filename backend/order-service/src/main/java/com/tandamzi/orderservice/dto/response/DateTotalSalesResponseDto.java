package com.tandamzi.orderservice.dto.response;

import lombok.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class DateTotalSalesResponseDto {
    private int count;
    private int totalSalesAmount;
}
