package com.tandamzi.orderservice.controller;

import com.tandamzi.orderservice.common.response.ResponseService;
import com.tandamzi.orderservice.common.result.Result;
import com.tandamzi.orderservice.common.result.SingleResult;
import com.tandamzi.orderservice.dto.request.RegisterOrderDto;
import com.tandamzi.orderservice.dto.response.OrderDetailResponseDto;
import com.tandamzi.orderservice.dto.response.OrderListResponseDto;
import com.tandamzi.orderservice.dto.response.OrderMobileListResponseDto;
import com.tandamzi.orderservice.service.OrderService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
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
        log.info("[OrderController] registerOrder ");
        orderService.registerOrder(orderDto);
        return responseService.getSuccessResult();
    }
    @PutMapping("/{order-id}/{state}")
    public Result changeOrderStatus(@PathVariable("order-id") Long orderId
            , @PathVariable("state") String state){
        log.info("[OrderController] changeOrderStatus ");
        orderService.changeOrderState(orderId,state);
        return responseService.getSuccessResult();
    }
    @GetMapping("/{order-id}")
    public SingleResult<OrderDetailResponseDto> detailOrder(@PathVariable("order-id") Long orderId){
        log.info("[OrderController] detailOrder ");
        return responseService.getSingleResult(orderService.detailOrder(orderId));
    }
    @GetMapping("")
    public SingleResult<Page<OrderListResponseDto>> orderList(@RequestParam("store-id") Long storeId,
                                                              @RequestParam(value = "nickname", required = false) String nickname,
                                                              @PageableDefault(size= 10) Pageable pageable){
        log.info("[OrderController] orderList ");

        Page<OrderListResponseDto> orderListResponseDtos = orderService.orderList(storeId, nickname, pageable);
        return responseService.getSingleResult(orderListResponseDtos);
    }
    @GetMapping("/{member-id}/order-list")
    public SingleResult<Page<OrderMobileListResponseDto>> mobileOrderList(@PathVariable("member-id") Long memberId,
                                                                          @PageableDefault(size= 10) Pageable pageable){
        log.info("[OrderController] mobileOrderList");
        Page<OrderMobileListResponseDto> responseDtos = orderService.mobileOrderList(memberId, pageable);
        return responseService.getSingleResult(responseDtos);
    }
}
