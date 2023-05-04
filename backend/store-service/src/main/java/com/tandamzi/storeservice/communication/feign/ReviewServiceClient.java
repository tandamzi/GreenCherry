package com.tandamzi.storeservice.communication.feign;

import com.tandamzi.storeservice.common.result.SingleResult;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "review-service")
public interface ReviewServiceClient {
    @GetMapping("/count")
    public SingleResult<Long> countReview(@RequestParam("store-id") Long storeId);
}
