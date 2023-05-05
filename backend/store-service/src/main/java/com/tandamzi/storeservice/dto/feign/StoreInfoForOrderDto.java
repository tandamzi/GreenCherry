package com.tandamzi.storeservice.dto.feign;

import com.tandamzi.storeservice.domain.Store;
import lombok.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class StoreInfoForOrderDto {
    private Long storeId;
    private String name;
    private boolean open;

    public static StoreInfoForOrderDto create(Store store){
        return StoreInfoForOrderDto.builder()
                .storeId(store.getId())
                .name(store.getName())
                .open(store.isOpen())
                .build();
    }
}
