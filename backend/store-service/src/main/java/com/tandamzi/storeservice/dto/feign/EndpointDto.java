package com.tandamzi.storeservice.dto.feign;

import lombok.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@ToString
public class EndpointDto {
    private String endpoint;
    private String p256dh;
    private String auth;
}
