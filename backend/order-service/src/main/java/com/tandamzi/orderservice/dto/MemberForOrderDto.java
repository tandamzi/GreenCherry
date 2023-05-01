package com.tandamzi.orderservice.dto;

import lombok.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class MemberForOrderDto {

    private Long memberId;
    private String nickname;

}
