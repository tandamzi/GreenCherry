package com.tandamzi.orderservice.service;

import com.tandamzi.orderservice.common.result.SingleResult;
import com.tandamzi.orderservice.domain.Order;
import com.tandamzi.orderservice.domain.State;
import com.tandamzi.orderservice.dto.MemberForOrderDto;
import com.tandamzi.orderservice.dto.OrderStatusDto;
import com.tandamzi.orderservice.dto.StoreInfoForOrderDto;
import com.tandamzi.orderservice.dto.Writed;
import com.tandamzi.orderservice.dto.request.RegisterOrderDto;
import com.tandamzi.orderservice.dto.response.*;
import com.tandamzi.orderservice.exception.OrderNotFoundException;
import com.tandamzi.orderservice.exception.OrderStatusNotEqualsException;
import com.tandamzi.orderservice.exception.StoreNotOpenException;
import com.tandamzi.orderservice.feign.MemberServiceClient;
import com.tandamzi.orderservice.feign.ReviewServiceClient;
import com.tandamzi.orderservice.feign.StoreServiceClient;
import com.tandamzi.orderservice.kafka.KafkaProducer;
import com.tandamzi.orderservice.repository.OrderRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
@Slf4j
@Transactional(readOnly = true)
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private StoreServiceClient storeServiceClient;

    @Autowired
    private KafkaProducer kafkaProducer;

    @Autowired
    private MemberServiceClient memberServiceClient;

    @Autowired
    private ReviewServiceClient reviewServiceClient;

    @Transactional
    public void registerOrder(RegisterOrderDto orderDto){
        log.info("[OrderService] registerOrder");
        log.info("orderDto.getStoreId() = {}", orderDto.getStoreId());

        SingleResult<StoreDetailforOrderResponseDto> result = storeServiceClient.storeDetailforOrder(orderDto);
        StoreDetailforOrderResponseDto storeDetail = result.getData();

        // TODO : 하나의 회원이 해당 가게에 대해 여러 번 주문할 경우 컬럼이 새로 생성된다.
        orderRepository.save(Order.builder()
                .memberId(orderDto.getMemberId())
                .storeId(orderDto.getStoreId())
                .state(State.ORDER_COMPLETE)
                .quantity(orderDto.getOrderQuantity())
                .totalSalesAmount(storeDetail.getTotalSalesAmount())
                .build());


    }

    @Transactional
    public void changeOrderState(Long orderId, String state){
        log.info("[OrderService] changeOrderState ");
        Order order = orderRepository.findById(orderId).orElseThrow(OrderNotFoundException::new);

        if(!State.ORDER_COMPLETE.toString().equals(state)){
            throw new OrderStatusNotEqualsException();
        }
        order.stateChange(State.PICKUP_COMPLETE);

        SingleResult<StoreInfoForOrderDto> info = storeServiceClient.storeInfoForOrder(order.getStoreId());

        OrderStatusDto statusDto = OrderStatusDto.builder()
                .orderId(order.getId())
                .memberId(order.getMemberId())
                .storeId(order.getStoreId())
                .storeName(info.getData().getName())
                .cherryPoint((int) (order.getTotalSalesAmount() * 0.1))
                .quentity(order.getQuantity())
                .totalSalesAmount(order.getTotalSalesAmount())
                .build();
        kafkaProducer.send("increase-member-cherry-point",statusDto);
        kafkaProducer.send("increase-store-cherry-point",statusDto);
        kafkaProducer.send("pickup-complete-order",statusDto);

    }
    
    public OrderDetailResponseDto detailOrder(Long orderId){
        log.info("[OrderService] detailOrder ");
        Order order = orderRepository.findById(orderId).orElseThrow(OrderNotFoundException::new);

        SingleResult<String> result = memberServiceClient.findNickname(order.getMemberId());
        String nickname = result.getData();

        return OrderDetailResponseDto.builder()
                .orderId(orderId)
                .name(nickname)
                .orderState(String.valueOf(order.getState()))
                .quantity(order.getQuantity())
                .totalSalesAmount(order.getTotalSalesAmount())
                .build();

    }
    /** 웹 용 */
    public Page<OrderListResponseDto> orderList(Long storeId,String nickname, Pageable pageable){
        log.info("[OrderService] orderList ");

        if(storeId == null ){
            throw new StoreNotOpenException();
        }

        Page<OrderListResponseDto> responseDto = null;


        if(nickname == null){
            Page<Order> orderPage = orderRepository.findOrderListByStoreIdAndMemberId(storeId, null, pageable);

            HashSet<Long> hashSet = new HashSet<>();
            orderPage.forEach(order -> {
                hashSet.add(order.getMemberId());
            });

            List<Long> list = new ArrayList<>(hashSet);
            SingleResult<List<MemberForOrderDto>> memberForOrder = memberServiceClient.findMemberForOrder(null, list);

            HashMap<Long, String> map = new HashMap<>();
            memberForOrder.getData().forEach(memberForOrderDto -> {
                map.put(memberForOrderDto.getMemberId() , memberForOrderDto.getNickname());
            });

            responseDto = orderPage.map(order -> OrderListResponseDto.create(order, map));

        }else{
            SingleResult<List<MemberForOrderDto>> memberForOrder = memberServiceClient.findMemberForOrder(nickname, null);

            HashMap<Long,String> map = new HashMap<>();
            memberForOrder.getData().forEach(memberForOrderDto -> {
                map.put(memberForOrderDto.getMemberId() , memberForOrderDto.getNickname());
            });

            List<Long> list = new ArrayList<>(map.keySet());


            Page<Order> orderPage = orderRepository.findOrderListByStoreIdAndMemberId(storeId, list, pageable);
            responseDto = orderPage.map(order -> OrderListResponseDto.create(order, map));


        }
        return responseDto;
    }

    /** 모바일 용 */
    public Page<OrderMobileListResponseDto> mobileOrderList(Long memberId, Pageable pageable){
        log.info("[OrderService] mobileOrderList ");

        Page<Order> pageByMemberId = orderRepository.findPageByMemberId(memberId, pageable);

//        LocalDateTime date = LocalDateTime.now();
//        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

        // TODO : 리뷰량이 많은 경우 속도 느림
        // TODO : order시간 기준 최신순 정렬
        Page<OrderMobileListResponseDto> pages = pageByMemberId.map(order -> {
            StoreInfoForOrderDto storeInfoDto = storeServiceClient.storeInfoForOrder(order.getStoreId()).getData();
            Boolean review = reviewServiceClient.existReviewByOrder(order.getId()).getData();

            String writedCheck = writedCheck(order.getCreateDate(), LocalDateTime.now(), review);
            return OrderMobileListResponseDto.create(order, storeInfoDto, writedCheck);
        });

        return pages;

    }
    public String writedCheck(LocalDateTime orderDate, LocalDateTime currentTime, Boolean review){
        log.info("[OrderService] writedCheck ");
        if(!review){
            if(currentTime.isAfter(orderDate.plusDays(3))){
                return String.valueOf(Writed.EXPIRATION);
            }else if(currentTime.isBefore(orderDate.plusDays(3))){
                return String.valueOf(Writed.NO);
            }
        }
        return String.valueOf(Writed.YES);

    }

}
