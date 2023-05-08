package com.tandamzi.noticeservice.dto.request;

import lombok.*;

import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class SubscribeStoreRequestDto {
    private Long storeId;
    private List<String> tokens;
}
