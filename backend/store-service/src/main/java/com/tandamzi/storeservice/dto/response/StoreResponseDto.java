package com.tandamzi.storeservice.dto.response;

import com.tandamzi.storeservice.domain.Address;
import lombok.*;

import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class StoreResponseDto {
    private Long id;
    private String name;
    private AddressResponseDto address;
    private List<String> images;

    //리뷰 수, 업종 추가
    private TypeResponseDto type;
    private Long numberOfReview;
}
