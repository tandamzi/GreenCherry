package com.tandamzi.storeservice.communication.feign;

import com.tandamzi.storeservice.common.result.ListResult;
import com.tandamzi.storeservice.dto.feign.EndpointDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@FeignClient(name = "member-service")
public interface MemberServiceClient {
    //가게를 구독한 memberId를 List로 넘겨주고 해당 멤버들의 List<endpoint>를 받아온다.
    @GetMapping("/member/endpoint")
    ListResult<EndpointDto> getEndpoints(@RequestParam List<Long> memberIdList);

}
