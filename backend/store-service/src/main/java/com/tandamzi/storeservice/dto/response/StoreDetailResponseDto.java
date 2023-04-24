package com.tandamzi.storeservice.dto.response;

import com.tandamzi.storeservice.domain.Type;
import lombok.*;

import java.time.LocalTime;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class StoreDetailResponseDto {
    private Long storeId;
    private String name;
    private Long ownerId;
    private TypeInfoDto type;
    private AddressDto address;
    private LocalTime pickUpStartTime;
    private LocalTime pickUpEndTime;
    private int cherryPoint;
    private boolean closed;
    private CherryBoxDto cherryBox;

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    @AllArgsConstructor
    private static class TypeInfoDto{
        private Long id;
        private String name;
    }

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    @AllArgsConstructor
    private static class AddressDto{
        private String addressName;
        private double lat;
        private double lng;
    }

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    @AllArgsConstructor
    private static class CherryBoxDto{

    }


}
