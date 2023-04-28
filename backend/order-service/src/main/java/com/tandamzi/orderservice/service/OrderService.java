package com.tandamzi.orderservice.service;

import com.tandamzi.orderservice.common.result.Result;
import com.tandamzi.orderservice.common.result.SingleResult;
import com.tandamzi.orderservice.domain.Order;
import com.tandamzi.orderservice.domain.State;
import com.tandamzi.orderservice.dto.OrderStatusDto;
import com.tandamzi.orderservice.dto.request.RegisterOrderDto;
import com.tandamzi.orderservice.dto.response.OrderDetailResponseDto;
import com.tandamzi.orderservice.dto.response.StoreDetailResponseDto;
import com.tandamzi.orderservice.exception.CherryBoxQuantityInsufficientException;
import com.tandamzi.orderservice.exception.OrderNotFoundException;
import com.tandamzi.orderservice.exception.OrderStatusNotEqualsException;
import com.tandamzi.orderservice.exception.StoreNotOpenException;
import com.tandamzi.orderservice.feign.OrderServiceClient;
import com.tandamzi.orderservice.kafka.KafkaProducer;
import com.tandamzi.orderservice.repository.OrderRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
@Transactional(readOnly = true)
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderServiceClient orderServiceClient;

    @Autowired
    private KafkaProducer kafkaProducer;

    @Transactional
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

    @Transactional
    public void changeOrderStatus(Long orderId, String state){
        log.info("[OrderService] changeOrderStatus ");
        Order order = orderRepository.findById(orderId).orElseThrow(OrderNotFoundException::new);

        if(!State.ORDER_COMPLETE.toString().equals(state)){
            throw new OrderStatusNotEqualsException();
        }
        order.statusChange(State.PICKUP_COMPLETE);

        OrderStatusDto statusDto = OrderStatusDto.builder()
                .memberId(order.getMemberId())
                .cherryPoint((int) (order.getTotalSalesAmount() * 0.1))
                .build();
        kafkaProducer.send("increase-cherry-point",statusDto);

    }
    
    public OrderDetailResponseDto detailOrder(Long orderId){
        log.info("[OrderService] detailOrder ");
        Order order = orderRepository.findById(orderId).orElseThrow(OrderNotFoundException::new);


        // TODO: feign 사용 /order.getMemberId()로 member-service에 있는 회원 닉네임 가져오기
        order.getQuantity();
        order.getState();
        return OrderDetailResponseDto.builder()
                .orderId(orderId)
//                .name(회원닉네임)
                .orderState(String.valueOf(order.getState()))
                .quantity(order.getQuantity())
                .totalSalesAmount(order.getTotalSalesAmount())
                .build();

    } 

}
