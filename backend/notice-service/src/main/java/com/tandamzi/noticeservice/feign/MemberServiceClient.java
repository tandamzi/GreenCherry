package com.tandamzi.noticeservice.feign;

import com.tandamzi.noticeservice.common.result.ListResult;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@FeignClient(name = "member-service")
public interface MemberServiceClient {

    @GetMapping("/member/token")
    ListResult<String> getTokens(@RequestParam("memberIdList") List<Long> memberIdList);

}
