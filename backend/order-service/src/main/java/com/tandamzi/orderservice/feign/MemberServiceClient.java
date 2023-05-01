package com.tandamzi.orderservice.feign;

import com.tandamzi.orderservice.common.result.SingleResult;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
@FeignClient(name = "member-service")
public interface MemberServiceClient {

    @GetMapping("/member/{member-id}/nickname")
    SingleResult<String> findNickname(@PathVariable("member-id") Long memberId);
}
