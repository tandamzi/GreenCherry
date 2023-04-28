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
        StoreDetailResponseDto storeDetail = result.getData();

        if(!storeDetail.isOpen()){
            throw new StoreNotOpenException();
        }

        if(orderDto.getOrderQuantity()>storeDetail.getCherryBox().getQuantity()){
            throw new CherryBoxQuantityInsufficientException();
        }

        int totalSalesAmount = orderDto.getOrderQuantity() * storeDetail.getCherryBox().getPricePerCherryBox();

        // TODO : 하나의 회원이 해당 가게에 대해 여러 번 주문할 경우 컬럼이 새로 생성된다.
        orderRepository.save(Order.builder()
                .memberId(orderDto.getMemberId())
                .storeId(orderDto.getStoreId())
                .state(State.ORDER_COMPLETE)
                .quantity(orderDto.getOrderQuantity())
                .totalSalesAmount(totalSalesAmount)
                .build());

        Result decreaseCherrybox = orderServiceClient.decreaseCherryBox(storeDetail.getStoreId(), orderDto.getOrderQuantity());

    }

    public void changeOrderStatus(String state){
        // State.PICKUP_COMPLETE 일 경우 체리 포인트 증가
//        if(State.ORDER_COMPLETE.toString().equals(state)){
//
//        }
    }

}
