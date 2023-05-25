package com.tandamzi.storeservice.dto.feign;

import com.tandamzi.storeservice.domain.Store;
import com.tandamzi.storeservice.domain.StoreImage;
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

    public static StoreInfoForOrderDto create(StoreImageQueryDto storeImage){
        return StoreInfoForOrderDto.builder()
                .storeId(storeImage.getStoreId())
                .name(storeImage.getStoreName())
                .storeImageUrl(storeImage.getStoreImageUrl())
                .open(storeImage.isOpen())
                .build();
    }
}
