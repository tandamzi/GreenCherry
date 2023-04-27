package com.tandamzi.orderservice.controller;

import com.tandamzi.orderservice.common.response.ResponseService;
import com.tandamzi.orderservice.common.result.Result;
import com.tandamzi.orderservice.domain.State;
import com.tandamzi.orderservice.dto.request.RegisterOrderDto;
import com.tandamzi.orderservice.service.OrderService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
@RequestMapping("/order")
@RequiredArgsConstructor
public class OrderController {
    private final OrderService orderService;
    private final ResponseService responseService;

    @PostMapping("")
    public Result registerOrder(@RequestBody RegisterOrderDto orderDto){
        orderService.registerOrder(orderDto);
        return responseService.getSuccessResult();
    }
//    @PutMapping("/{order-id}/{status}")
//    public Result changeOrderStatus(@PathVariable("order-id") Long orderId
//            , @PathVariable("status") String status){
//        orderService.changeOrderStatus(status);
//    }
}
