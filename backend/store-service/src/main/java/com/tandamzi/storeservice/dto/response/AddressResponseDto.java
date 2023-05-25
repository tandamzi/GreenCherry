package com.tandamzi.storeservice.dto.response;

import com.tandamzi.storeservice.domain.Address;
import lombok.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class AddressResponseDto {
    private String addressName;
    private String detailAddressName;
    private double lat;
    private double lng;

    public static AddressResponseDto create(Address address){
        return AddressResponseDto.builder()
                .addressName(address.getAddressName())
                .detailAddressName(address.getDetailAddressName())
                .lat(address.getLat())
                .lng(address.getLng())
                .build();
    }
}
