package com.tandamzi.noticeservice.dto.response;


import lombok.*;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class OrderMobileListResponseDto {
    private Long orderId;
    private String storeName;
    private int quantity;
    private String orderState;
    private int totalSalesAmount;
    private LocalDateTime orderDate;
    private String writed;
    private Long memberId;
    private Long storeId;

}
