package com.tandamzi.orderservice.service;

import com.tandamzi.orderservice.domain.Order;
import com.tandamzi.orderservice.domain.State;
import com.tandamzi.orderservice.dto.request.RegisterOrderDto;
import com.tandamzi.orderservice.dto.response.StoreDetailResponseDto;
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
        StoreDetailResponseDto storeDetail = orderServiceClient.getStoreDetail(orderDto.getStoreId());
        storeDetail.getCherryBox(); // 체리박스 관한 정보
        storeDetail.isOpen(); // 영업중 확인

        if(!storeDetail.isOpen()){
            // 예약못함
        }
        // 회원이 주문한 개수보다 체리박스 개수가 작으면 예약 못함
        if(orderDto.getOrderQuantity()>storeDetail.getCherryBox().getQuantity()){
            // 예약 못함
        }
        // orderRepository에 주문 생성
        // 피그마 화면 : 주문 번호, 닉네임, 수량 , 상태

        int totalSalesAmount = orderDto.getOrderQuantity() * storeDetail.getCherryBox().getPricePerCherryBox();


        orderRepository.save(Order.builder()
                .memberId(orderDto.getMemberId())
                .storeId(orderDto.getStoreId())
                .state(State.ORDER_COMPLETE)
                .quantity(orderDto.getOrderQuantity())
                .totalSalesAmount(totalSalesAmount)
                .build());

        // 가게에 (체리박스 수 - 주문 수) DB에 저장해라
        // Body로 주문수 or (체리박스 수 - 주문 수) 넘겨주기
        orderServiceClient.updateCherryBox(storeDetail.getStoreId());

    }

    public void changeOrderStatus(String state){
        // State.PICKUP_COMPLETE 일 경우 체리 포인트 증가
//        if(State.ORDER_COMPLETE.toString().equals(state)){
//
//        }
    }

}
