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
    private String storeImageUrl;
    private boolean open;

    public static StoreInfoForOrderDto create(Store store,String storeImageUrl){
        return StoreInfoForOrderDto.builder()
                .storeId(store.getId())
                .name(store.getName())
                .storeImageUrl(storeImageUrl)
                .open(store.isOpen())
                .build();
    }
}
