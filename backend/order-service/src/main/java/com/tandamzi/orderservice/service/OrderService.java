package com.tandamzi.orderservice.service;

import com.tandamzi.orderservice.common.result.Result;
import com.tandamzi.orderservice.common.result.SingleResult;
import com.tandamzi.orderservice.domain.Order;
import com.tandamzi.orderservice.domain.State;
import com.tandamzi.orderservice.dto.request.RegisterOrderDto;
import com.tandamzi.orderservice.dto.response.StoreDetailResponseDto;
import com.tandamzi.orderservice.exception.CherryBoxQuantityInsufficientException;
import com.tandamzi.orderservice.exception.StoreNotOpenException;
import com.tandamzi.orderservice.feign.OrderServiceClient;
import com.tandamzi.orderservice.repository.OrderRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderServiceClient orderServiceClient;

    public void registerOrder(RegisterOrderDto orderDto){
        log.info("orderDto.getStoreId() = {}", orderDto.getStoreId());
        SingleResult<StoreDetailResponseDto> result = orderServiceClient.searchStoreDetail(orderDto.getStoreId());

        log.info("result = {}", result.getMessage());

        StoreDetailResponseDto storeDetail = result.getData();
        log.info("registerOrder => storeDetail ={}",storeDetail);
        if(!storeDetail.isOpen()){
            throw new StoreNotOpenException();
        }

        if(orderDto.getOrderQuantity()>storeDetail.getCherryBox().getQuantity()){
            throw new CherryBoxQuantityInsufficientException();
        }

        int totalSalesAmount = orderDto.getOrderQuantity() * storeDetail.getCherryBox().getPricePerCherryBox();


        orderRepository.save(Order.builder()
                .memberId(orderDto.getMemberId())
                .storeId(orderDto.getStoreId())
                .state(State.ORDER_COMPLETE)
                .quantity(orderDto.getOrderQuantity())
                .totalSalesAmount(totalSalesAmount)
                .build());

        Result decreaseCherrybox = orderServiceClient.decreaseCherrybox(storeDetail.getStoreId(), orderDto.getOrderQuantity());
        log.info("decreaseCherrybox.getMessage() = {}", decreaseCherrybox.getMessage());

    }

    public void changeOrderStatus(String state){
        // State.PICKUP_COMPLETE 일 경우 체리 포인트 증가
//        if(State.ORDER_COMPLETE.toString().equals(state)){
//
//        }
    }

}
