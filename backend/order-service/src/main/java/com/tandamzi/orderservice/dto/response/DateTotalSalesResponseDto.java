package com.tandamzi.orderservice.dto.response;

import lombok.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class DateTotalSalesResponseDto {
    private Long count;
    private Long totalSalesAmount;

    public static DateTotalSalesResponseDto create(Long count, Long totalSalesAmount){
        return DateTotalSalesResponseDto.builder()
                .count(count)
                .totalSalesAmount(totalSalesAmount)
                .build();
    }
}
