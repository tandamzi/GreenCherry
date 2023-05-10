package com.tandamzi.orderservice.dto.response;


import com.tandamzi.orderservice.domain.Order;
import com.tandamzi.orderservice.dto.StoreInfoForOrderDto;
import com.tandamzi.orderservice.dto.Writed;
import lombok.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import static org.aspectj.util.FuzzyBoolean.YES;
import static org.springframework.amqp.support.AmqpHeaders.EXPIRATION;
import static org.springframework.beans.factory.annotation.Autowire.NO;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@ToString
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



    public static OrderMobileListResponseDto create(Order order, StoreInfoForOrderDto storeInfoDto, String writedCheck){

        return OrderMobileListResponseDto.builder()
                .orderId(order.getId())
                .storeName(storeInfoDto.getName())
                .quantity(order.getQuantity())
                .orderState(String.valueOf(order.getState()))
                .totalSalesAmount(order.getTotalSalesAmount())
                .orderDate(order.getCreateDate())
                .writed(writedCheck)
                .memberId(order.getMemberId())
                .storeId(storeInfoDto.getStoreId())
                .build();
    }


}
