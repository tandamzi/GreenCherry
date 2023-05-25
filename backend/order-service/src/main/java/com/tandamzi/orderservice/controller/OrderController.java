package com.tandamzi.orderservice.controller;

import com.tandamzi.orderservice.common.response.ResponseService;
import com.tandamzi.orderservice.common.result.ListResult;
import com.tandamzi.orderservice.common.result.Result;
import com.tandamzi.orderservice.common.result.SingleResult;
import com.tandamzi.orderservice.dto.request.RegisterOrderDto;
import com.tandamzi.orderservice.dto.response.*;
import com.tandamzi.orderservice.service.OrderService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

import java.util.List;


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
    @GetMapping("/progress")
    public ListResult<ProgressOrderResponseDto> progressOrder(@RequestParam("member-id") Long memberId){
        log.info("[OrderController] progressOrder 실행 -> memberId = {} ", memberId);

        List<ProgressOrderResponseDto> requestDto = orderService.progressOrder(memberId);
        return responseService.getListResult(requestDto);
    }
    @GetMapping("")
    public SingleResult<Page<OrderListResponseDto>> orderList(@RequestParam("store-id") Long storeId,
                                                              @RequestParam(value = "nickname", required = false) String nickname,
                                                              @RequestParam(value = "order-date", required = false) String date,
                                                              @PageableDefault(size= 10) Pageable pageable){
        log.info("[OrderController] orderList ");

        Page<OrderListResponseDto> orderListResponseDtos = orderService.orderList(storeId, nickname, date, pageable);
        return responseService.getSingleResult(orderListResponseDtos);
    }
    @GetMapping("/{member-id}/order-list")
    public SingleResult<Page<OrderMobileListResponseDto>> mobileOrderList(@PathVariable("member-id") Long memberId,
                                                                          @PageableDefault(size= 10) Pageable pageable){
        log.info("[OrderController] mobileOrderList");
        Page<OrderMobileListResponseDto> responseDtos = orderService.mobileOrderList(memberId, pageable);
        return responseService.getSingleResult(responseDtos);
    }

    @GetMapping("/notice/order-list")
    public SingleResult<List<NoticeListResponseDto>> noticeOrderList(@RequestParam("orderIds") List<Long> orderIds){
        log.info("[OrderController] noticeOrderList");
        List<NoticeListResponseDto> noticeOrderList = orderService.noticeOrderList(orderIds);
        return responseService.getSingleResult(noticeOrderList);
    }

    @GetMapping("/revenue")
    public SingleResult<DateTotalSalesResponseDto> getTotalSalesAmount(@RequestParam("store-id") Long storeId,
                                      @RequestParam("order-date") String orderDate){
        log.info("[OrderController] getTotalSalesAmount");

        DateTotalSalesResponseDto dateTotalSales = orderService.getDateTotalSales(storeId, orderDate);
        return responseService.getSingleResult(dateTotalSales);
    }

    @GetMapping("/week/cherry-point")
    public SingleResult<WeekCherryPointResponseDto> getCherryPointByWeek(@RequestParam("current-date") String currentDate){
        log.info("[OrderController] getCherryPointByMemberId");
        WeekCherryPointResponseDto byWeek = orderService.getCherryPointByWeek(currentDate);
        return responseService.getSingleResult(byWeek);
    }
}
