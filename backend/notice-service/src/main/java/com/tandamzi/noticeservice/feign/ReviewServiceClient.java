package com.tandamzi.noticeservice.feign;

import com.tandamzi.noticeservice.common.result.SingleResult;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@FeignClient(name = "review-service")
public interface ReviewServiceClient {

    @GetMapping("/review/exist")
    SingleResult<List<Long>> existReviewByOrder(@RequestParam("orderList") List<Long> orderList);

}