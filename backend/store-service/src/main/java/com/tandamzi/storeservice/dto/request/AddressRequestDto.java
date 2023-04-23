package com.tandamzi.storeservice.dto.request;

import com.tandamzi.storeservice.domain.Address;
import lombok.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class AddressRequestDto {
    private String addressName;
    private double lat;
    private double lng;

    public Address toEntity(){
        return Address.builder()
                .addressName(addressName)
                .lat(lat)
                .lng(lng)
                .build();
    }
}
