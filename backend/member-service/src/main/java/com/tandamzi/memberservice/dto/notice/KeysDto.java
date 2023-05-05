package com.tandamzi.memberservice.dto.notice;

import lombok.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class KeysDto {

    private String p256dh;
    private String auth;
}
