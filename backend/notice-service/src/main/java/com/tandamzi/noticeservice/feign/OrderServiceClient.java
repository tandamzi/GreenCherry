package com.tandamzi.noticeservice.feign;

import com.tandamzi.noticeservice.common.result.SingleResult;
import com.tandamzi.noticeservice.dto.response.NoticeListResponseDto;
import com.tandamzi.noticeservice.dto.response.OrderMobileListResponseDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@FeignClient(name = "order-service")
public interface OrderServiceClient {
    @GetMapping("/order/notice/order-list")
    SingleResult<Page<NoticeListResponseDto>> noticeOrderList(@RequestParam("orderIds") List<Long> orderIds, @PageableDefault(size= 10) Pageable pageable);
}
