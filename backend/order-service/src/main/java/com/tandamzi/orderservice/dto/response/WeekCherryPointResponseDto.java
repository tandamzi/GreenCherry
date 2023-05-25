package com.tandamzi.orderservice.dto.response;

import lombok.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class WeekCherryPointResponseDto {
    private Long totalOrderCount;
    private Long totalPoint;

    public static WeekCherryPointResponseDto create(Long count, Long totalPoint){
        return WeekCherryPointResponseDto.builder()
                .totalOrderCount(count)
                .totalPoint(totalPoint)
                .build();
    }
}
