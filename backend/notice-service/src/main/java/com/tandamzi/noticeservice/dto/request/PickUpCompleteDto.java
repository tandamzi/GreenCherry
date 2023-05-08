package com.tandamzi.noticeservice.dto.request;

import lombok.*;

import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class PickUpCompleteDto {

    private Long orderId;
    private Long memberId;
    private Long storeId;
    private String storeName;
    private int quentity;
    private int totalSalesAmount;
    private List<String> tokens;



}
