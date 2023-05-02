package com.tandamzi.reviewservice.feign;

import com.tandamzi.reviewservice.common.result.SingleResult;
import com.tandamzi.reviewservice.dto.member.MemberDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@FeignClient("member-service")
public interface MemberServiceClient {

    @GetMapping("/member/search")
    SingleResult<List<MemberDto>> findMember(@RequestParam(value = "nickname", required = false) String nickname,
                                             @RequestParam(value = "memberIds", required = false) List<Long> memberIds);
}
