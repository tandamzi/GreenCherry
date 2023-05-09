package com.tandamzi.storeservice.dto.response;

import lombok.*;

import java.time.LocalTime;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class SubScribedStoreResponseDto {
    private Long id;
    private String name;
    private String type;
    private String image;
    private int quantity;
    private LocalTime pickUpStartTime;
    private LocalTime pickUpEndTime;
    private boolean open;

}
