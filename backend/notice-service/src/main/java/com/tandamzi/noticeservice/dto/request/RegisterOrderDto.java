package com.tandamzi.noticeservice.dto.request;

import lombok.*;

import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class RegisterOrderDto {

    private int noticeType;
    private Long storeId;
    private int quantity;
    private int totalSalesAmount;
    private List<String> tokens;

}
