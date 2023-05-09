package com.tandamzi.noticeservice.feign;

import com.tandamzi.noticeservice.common.result.SingleResult;
import com.tandamzi.noticeservice.dto.response.NoticeListResponseDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@FeignClient(name = "order-service")
public interface OrderServiceClient {
    @GetMapping("/order/notice/order-list")
    SingleResult<List<NoticeListResponseDto>> noticeOrderList(@RequestParam("orderIds") List<Long> orderIds);
}
