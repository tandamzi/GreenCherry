package com.tandamzi.storeservice.dto.feign;

import lombok.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
public class StoreImageQueryDto {
    private Long storeId;
    private Long storeImageId;
    private String storeName;
    private boolean open;
    private String storeImageUrl;

    public StoreImageQueryDto(Long storeId, Long storeImageId, String storeName, boolean open, String storeImageUrl) {
        this.storeId = storeId;
        this.storeImageId = storeImageId;
        this.storeName = storeName;
        this.open = open;
        this.storeImageUrl = storeImageUrl;
    }
}
