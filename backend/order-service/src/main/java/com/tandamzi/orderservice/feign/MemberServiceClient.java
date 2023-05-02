package com.tandamzi.orderservice.feign;

import com.tandamzi.orderservice.common.result.SingleResult;
import com.tandamzi.orderservice.dto.MemberForOrderDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@FeignClient(name = "member-service")
public interface MemberServiceClient {

    @GetMapping("/member/{member-id}/nickname")
    SingleResult<String> findNickname(@PathVariable("member-id") Long memberId);

    @GetMapping("/member/search")
    SingleResult<List<MemberForOrderDto>> findMemberForOrder(@RequestParam(value = "nickname", required = false) String nickname,
                                                                    @RequestParam(value = "memberIds", required = false) List<Long> memberIds);
}
