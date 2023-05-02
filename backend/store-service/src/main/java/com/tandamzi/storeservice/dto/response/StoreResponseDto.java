package com.tandamzi.storeservice.dto.response;

import com.tandamzi.storeservice.domain.Address;
import lombok.*;

import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class StoreResponseDto {
    private String name;
    private Address address;
    private List<String> images;
}
