package com.tandamzi.noticeservice.dto.response;

import com.tandamzi.noticeservice.domain.Notice;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class ListResponseDto {
    private Long orderId;
    private String storeName;
    private int quantity;
    private String orderState;
    private int totalSalesAmount;
    private LocalDateTime orderDate;
    private String writed;
    private Long memberId;
    private Long storeId;
    private boolean isRead;

    public static ListResponseDto createNotice(NoticeListResponseDto dto,boolean isRead){
        return ListResponseDto.builder()
                .orderId(dto.getOrderId())
                .storeName(dto.getStoreName())
                .quantity(dto.getQuantity())
                .orderState(dto.getOrderState())
                .totalSalesAmount(dto.getTotalSalesAmount())
                .orderDate(dto.getOrderDate())
                .writed(dto.getWrited())
                .memberId(dto.getMemberId())
                .storeId(dto.getStoreId())
                .isRead(isRead)
                .build();
    }
    public static ListResponseDto createList(ListResponseDto dto,boolean isRead){
        return ListResponseDto.builder()
                .orderId(dto.getOrderId())
                .storeName(dto.getStoreName())
                .quantity(dto.getQuantity())
                .orderState(dto.getOrderState())
                .totalSalesAmount(dto.getTotalSalesAmount())
                .orderDate(dto.getOrderDate())
                .writed(dto.getWrited())
                .memberId(dto.getMemberId())
                .storeId(dto.getStoreId())
                .isRead(isRead)
                .build();
    }


}
