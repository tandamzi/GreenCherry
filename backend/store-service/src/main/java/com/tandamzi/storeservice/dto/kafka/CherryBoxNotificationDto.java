package com.tandamzi.storeservice.dto.kafka;

import lombok.*;

import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@ToString
public class CherryBoxNotificationDto {
    private long storeId;
    private String storeName;
    private List<String> endpointList;
}
