package com.tandamzi.storeservice.dto.request;

import lombok.*;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@ToString
public class UpdateStoreRequestDto {
    private String storeDescription;
    private String cherryBoxDescription;
    private LocalTime pickUpStartTime;
    private LocalTime pickUpEndTime;
    private List<Long> allergyIdList;
    private String snsAccount;
}
