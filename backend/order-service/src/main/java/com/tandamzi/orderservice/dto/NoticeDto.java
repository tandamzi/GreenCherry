package com.tandamzi.orderservice.dto;

import lombok.*;

import java.io.Serializable;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class NoticeDto implements Serializable {

    private int noticeType;
    private Long targetMemberId;
    private int quantity;
    private int totalSalesAmount;
    private Long storeId;
}
