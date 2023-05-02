package com.tandamzi.reviewservice.dto.tag;

import lombok.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class TagStatsDto {

    private Long id;
    private String name;
    private int count;

}
