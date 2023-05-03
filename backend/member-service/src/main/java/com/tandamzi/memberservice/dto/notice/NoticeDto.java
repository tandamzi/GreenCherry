package com.tandamzi.memberservice.dto.notice;

import com.tandamzi.memberservice.domain.Notice;
import lombok.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class NoticeDto {

    private String endpoint;
    private String expirationTime;
    private KeysDto keys;

    public Notice toEntity(){
        return Notice.builder()
                .endPoint(endpoint)
                .p256dh(keys.getP256dh())
                .auth(keys.getAuth())
                .build();
    }
}
