package com.tandamzi.orderservice.feign;

import com.tandamzi.orderservice.common.result.SingleResult;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "review-service")
public interface ReviewServiceClient {

    @GetMapping("/review/exist")
    SingleResult<Boolean> existReviewByOrder(@RequestParam("order-id") Long orderId);
}
