package com.tandamzi.memberservice.dto.member;

import com.tandamzi.memberservice.domain.Member;
import lombok.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class MemberResponseDto {

    private Long id;
    private String email;
    private String nickname;
    private int cherryPoint;
    private String image;
    private boolean alarm;

    public static MemberResponseDto create(Member member){
        return MemberResponseDto.builder()
                .id(member.getId())
                .email(member.getEmail())
                .nickname(member.getNickname())
                .cherryPoint(member.getCherryPoint())
                .image(member.getImage())
                .alarm(member.isAlarm())
                .build();
    }
}
