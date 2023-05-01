package com.tandamzi.orderservice.controller;

import com.tandamzi.orderservice.common.response.ResponseService;
import com.tandamzi.orderservice.common.result.Result;
import com.tandamzi.orderservice.common.result.SingleResult;
import com.tandamzi.orderservice.domain.State;
import com.tandamzi.orderservice.dto.request.RegisterOrderDto;
import com.tandamzi.orderservice.dto.response.OrderDetailResponseDto;
import com.tandamzi.orderservice.kafka.KafkaProducer;
import com.tandamzi.orderservice.service.OrderService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import javax.ws.rs.QueryParam;

@RestController
@Slf4j
@RequestMapping("/order")
@RequiredArgsConstructor
public class OrderController {
    private final OrderService orderService;
    private final ResponseService responseService;

    @PostMapping("")
    public Result registerOrder(@RequestBody RegisterOrderDto orderDto){
        log.info("[OrderController] registerOrder ");
        orderService.registerOrder(orderDto);
        return responseService.getSuccessResult();
    }
    @PutMapping("/{order-id}/{status}")
    public Result changeOrderStatus(@PathVariable("order-id") Long orderId
            , @PathVariable("status") String status){
        log.info("[OrderController] changeOrderStatus ");
        orderService.changeOrderStatus(orderId,status);
        return responseService.getSuccessResult();
    }
    @GetMapping("/{order-id}")
    public SingleResult<OrderDetailResponseDto> detailOrder(@PathVariable("order-id") Long orderId){
        log.info("[OrderController] detailOrder ");
        return responseService.getSingleResult(orderService.detailOrder(orderId));
    }
    @GetMapping("")
    public Result orderList(@RequestParam("store-id") Long storeId, @RequestParam(value = "nickname",required = false) String nickname, Pageable pageable){
        log.info("[OrderController] orderList ");

        orderService.orderList(storeId,nickname,pageable);
        return responseService.getSuccessResult();
    }
}
