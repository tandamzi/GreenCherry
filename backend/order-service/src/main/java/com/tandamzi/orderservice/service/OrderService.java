package com.tandamzi.orderservice.service;

import com.tandamzi.orderservice.common.result.SingleResult;
import com.tandamzi.orderservice.domain.Order;
import com.tandamzi.orderservice.domain.State;
import com.tandamzi.orderservice.dto.*;
import com.tandamzi.orderservice.dto.request.RegisterOrderDto;
import com.tandamzi.orderservice.dto.response.*;
import com.tandamzi.orderservice.exception.OrderNotFoundException;
import com.tandamzi.orderservice.exception.OrderStatusNotEqualsException;
import com.tandamzi.orderservice.exception.StoreNotOpenException;
import com.tandamzi.orderservice.feign.MemberServiceClient;
import com.tandamzi.orderservice.feign.ReviewServiceClient;
import com.tandamzi.orderservice.feign.StoreServiceClient;
import com.tandamzi.orderservice.feign.dto.StoreNameDto;
import com.tandamzi.orderservice.kafka.KafkaProducer;
import com.tandamzi.orderservice.repository.OrderRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.Tuple;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

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

        Order order = orderRepository.save(Order.builder()
                .memberId(orderDto.getMemberId())
                .storeId(orderDto.getStoreId())
                .state(State.ORDER_COMPLETE)
                .quantity(orderDto.getOrderQuantity())
                .totalSalesAmount(storeDetail.getTotalSalesAmount())
                .build());

        // 동기로 storeId의 주인장의
        log.info("ownerId = {}", storeDetail.getOwnerId());

        String memberNickname = memberServiceClient.findNickname(order.getMemberId()).getData();

        NoticeDto noticeDto = NoticeDto.builder()
                .noticeType(2)
                .targetMemberId(storeDetail.getOwnerId())
                .quantity(orderDto.getOrderQuantity())
                .totalSalesAmount(storeDetail.getTotalSalesAmount())
                .storeId(storeDetail.getStoreId())
                .orderId(order.getId())
                .nickname(memberNickname)
                .orderState(order.getState().toString())
                .orderDate(order.getCreateDate())
                .build();

        kafkaProducer.send("notice-for-register-order", noticeDto);
    }

    @Transactional
    public void changeOrderState(Long orderId, String state){
        log.info("[OrderService] changeOrderState ");
        Order order = orderRepository.findById(orderId).orElseThrow(OrderNotFoundException::new);

        if(!State.ORDER_COMPLETE.toString().equals(state)){
            throw new OrderStatusNotEqualsException();
        }
        order.stateChange(State.PICKUP_COMPLETE);

        List<Long> storeIdsByOrder = new ArrayList<>();
        storeIdsByOrder.add(order.getStoreId());

        StoreInfoForOrderDto info = storeServiceClient.storeInfoForOrder(storeIdsByOrder).getData().get(0);

        OrderStatusDto statusDto = OrderStatusDto.builder()
                .orderId(order.getId())
                .memberId(order.getMemberId())
                .storeId(order.getStoreId())
                .storeName(info.getName())
                .cherryPoint(order.getQuantity())
                .quentity(order.getQuantity())
                .totalSalesAmount(order.getTotalSalesAmount())
                .build();
        kafkaProducer.send("increase-member-cherry-point",statusDto);
        kafkaProducer.send("increase-store-cherry-point",statusDto);
        kafkaProducer.send("pickup-complete-order",statusDto);

    }
    
    public List<ProgressOrderResponseDto> progressOrder(Long memberId){
        log.info("[OrderService] progressOrder 실행 -> memberId = {}", memberId);
        List<Order> orders = orderRepository.findProgressOrder(memberId, State.ORDER_COMPLETE);

        HashSet<Long> storeIdSet = new HashSet<>();
        orders.forEach(o -> storeIdSet.add(o.getStoreId()));

        List<Long> storeIds = new ArrayList<>(storeIdSet);
        List<StoreNameDto> clientResult = storeServiceClient.storeNameForProgressOrder(storeIds).getData();

        HashMap<Long, String> storeNames = new HashMap<>();
        clientResult.forEach(s -> storeNames.put(s.getStoreId(), s.getName()));

        return orders.stream()
                .map(o -> ProgressOrderResponseDto.create(o, storeNames))
                .collect(Collectors.toList());
    }
    /** 웹 용 */
    public Page<OrderListResponseDto> orderList(Long storeId,String nickname, String date, Pageable pageable){
        log.info("[OrderService] orderList ");

        if(storeId == null ){
            throw new StoreNotOpenException();
        }

        Page<OrderListResponseDto> responseDto = null;

        if(nickname == null){
            Page<Order> orderPage = orderRepository.findOrderListByStoreIdAndMemberId(storeId, null, date, pageable);

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


            Page<Order> orderPage = orderRepository.findOrderListByStoreIdAndMemberId(storeId, list, date, pageable);
            responseDto = orderPage.map(order -> OrderListResponseDto.create(order, map));
        }

        return responseDto;
    }

    /** 모바일 용 */
    public Page<OrderMobileListResponseDto> mobileOrderList(Long memberId, Pageable pageable){
        log.info("[OrderService] mobileOrderList ");

        Page<Order> orders = orderRepository.findPageByMemberId(memberId, pageable);

        List<Long> storeIds = new ArrayList<>();
        List<Long> orderIds = new ArrayList<>();

        orders.forEach(order -> {
            storeIds.add(order.getStoreId());
            orderIds.add(order.getId());
        });

        List<StoreInfoForOrderDto> storeInfoForOrderDtos = storeServiceClient.storeInfoForOrder(storeIds).getData();
        List<Long> orderIdsByReview = reviewServiceClient.existReviewByOrder(orderIds).getData();

        HashMap<Long,StoreInfoForOrderDto> storeInfoMap = new HashMap<>();
        storeInfoForOrderDtos.forEach(storeInfo-> storeInfoMap.put(storeInfo.getStoreId(),storeInfo));

        HashSet<Long> set = new HashSet<>(orderIdsByReview);
        Page<OrderMobileListResponseDto> pages = orders.map(order -> {
            StoreInfoForOrderDto storeInfoForOrderDto = storeInfoMap.get(order.getStoreId());
            String writedCheck = writedCheck(order.getId(), order.getCreateDate(), LocalDateTime.now(), set);
            return OrderMobileListResponseDto.create(order, storeInfoForOrderDto, writedCheck);
        });

        return pages;

    }

    public String writedCheck(Long orderId,LocalDateTime orderDate, LocalDateTime currentTime, HashSet<Long> set){
        log.info("[OrderService] writedCheck ");
        if(!set.contains(orderId)){
            if(currentTime.isAfter(orderDate.plusDays(3))){
                // 리뷰 작성 기간 만료
                return String.valueOf(Writed.EXPIRATION);
            }else if(currentTime.isBefore(orderDate.plusDays(3))){
                // 리뷰 안씀, 리뷰 적어주세요 띄우기
                return String.valueOf(Writed.NO);
            }
        }
        return String.valueOf(Writed.YES);
    }
    public List<NoticeListResponseDto> noticeOrderList(List<Long> orderId){
        log.info("[OrderService] noticeOrderList ");

        List<Order> orders = orderRepository.findListById(orderId);

        List<Long> storeIds = new ArrayList<>();
        List<Long> orderIds = new ArrayList<>();

        orders.forEach(order -> {
            storeIds.add(order.getStoreId());
            orderIds.add(order.getId());
        });


        List<StoreInfoForOrderDto> storeInfoForOrderDtos = storeServiceClient.storeInfoForOrder(storeIds).getData();
        List<Long> orderIdsByReview = reviewServiceClient.existReviewByOrder(orderIds).getData();

        HashMap<Long,StoreInfoForOrderDto> storeInfoMap = new HashMap<>();
        storeInfoForOrderDtos.forEach(storeInfo -> storeInfoMap.put(storeInfo.getStoreId(),storeInfo));

        HashSet<Long> set = new HashSet<>(orderIdsByReview);

        List<NoticeListResponseDto> list = orders.stream().map(order -> {
            StoreInfoForOrderDto storeInfoForOrderDto = storeInfoMap.get(order.getStoreId());
            String writedCheck = writedCheck(order.getId(), order.getCreateDate(), LocalDateTime.now(), set);
            return NoticeListResponseDto.create(order, storeInfoForOrderDto, writedCheck);
        }).collect(Collectors.toList());
        
        return list;

    }
    public DateTotalSalesResponseDto getDateTotalSales(Long storeId, String orderDate){
        log.info("[OrderService] getDateTotalSales ");

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDateTime startDateTime = LocalDate.parse(orderDate,formatter).atStartOfDay();
        LocalDateTime endDateTime = LocalDate.parse(orderDate,formatter).atTime(LocalTime.MAX);

        Tuple tuple = orderRepository.findTupleByStoreIdAndCreateDate(storeId, startDateTime, endDateTime);

        Long count = tuple.get("count",Long.class);
        Long totalSalesAmount = tuple.get("totalAmount", Long.class);

        return DateTotalSalesResponseDto.create(count,totalSalesAmount);
    }

    public WeekCherryPointResponseDto getCherryPointByWeek(String currentDate){
        log.info("[OrderService] getCherryPointByWeek ");

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDateTime startDateTime = LocalDate.parse(currentDate,formatter).atStartOfDay();
        LocalDateTime endDateTime = LocalDate.parse(currentDate,formatter).atStartOfDay().plusWeeks(1);

        Tuple tuple = orderRepository.findTupleBetWeenCurrentDateAndEndDate(startDateTime, endDateTime);
        Long count = tuple.get("count", Long.class);
        Long totalPoint = tuple.get("totalQuantity", Long.class);

        return WeekCherryPointResponseDto.create(count,totalPoint);


    }

}
