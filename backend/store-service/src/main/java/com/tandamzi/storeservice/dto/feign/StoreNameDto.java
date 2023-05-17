package com.tandamzi.storeservice.dto.feign;

import com.tandamzi.storeservice.domain.Store;
import lombok.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class StoreNameDto {

    private Long storeId;
    private String name;

    public static StoreNameDto create(Store store){
        return StoreNameDto.builder()
                .storeId(store.getId())
                .name(store.getName())
                .build();
    }
}
