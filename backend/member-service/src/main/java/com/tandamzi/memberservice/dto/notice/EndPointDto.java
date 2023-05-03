package com.tandamzi.memberservice.dto.notice;

import com.tandamzi.memberservice.domain.Notice;
import lombok.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class EndPointDto {
    private String endpoint;
    private String p256dh;
    private String auth;

    public static EndPointDto create(Notice notice){
        return EndPointDto.builder()
                .endpoint(notice.getEndPoint())
                .p256dh(notice.getP256dh())
                .auth(notice.getAuth())
                .build();
    }
}
