package com.tandamzi.reviewservice.dto.member;

import lombok.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class MemberDto {

    private Long memberId;
    private String nickname;
    private String memberImageUrl;

}
