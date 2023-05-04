package com.tandamzi.orderservice.dto.response;


import com.tandamzi.orderservice.domain.Order;
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

    public String writedCheck(String writed,LocalDateTime orderDate, LocalDateTime currentTime,Boolean review){
        if(!review){
            if(currentTime.isAfter(orderDate.plusDays(3))){
                writed = EXPIRATION;
            }else if(currentTime.isBefore(orderDate.plusDays(3))){
                writed = NO;
            }
        }else{
            OrderMobileListResponseDto.writed = YES;
        }
    }

    public static OrderMobileListResponseDto create(Order order,StoreDetailResponseDto storeDetailDto,Boolean review){
        //현재 시간 2023-04-27 07:28:39
        LocalDateTime date = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        LocalDateTime currentTime = LocalDateTime.parse(date.format(formatter));
        // TODO 함수로 뺄 것
        if(!review){
            if(currentTime.isAfter(order.getCreateDate().plusDays(3))){
                OrderMobileListResponseDto.writed = EXPIRATION;
            }else if(currentTime.isBefore(order.getCreateDate().plusDays(3))){
                OrderMobileListResponseDto.writed = NO;
            }
        }else{
            OrderMobileListResponseDto.writed = YES;
        }
        return OrderMobileListResponseDto.builder()
                .orderId(order.getId())
                .storeName(storeDetailDto.getName())
                .quantity(order.getQuantity())
                .orderState(String.valueOf(order.getState()))
                .totalSalesAmount(order.getTotalSalesAmount())
                .orderDate(order.getCreateDate())
                .writed(review)
                .build();
    }


}
