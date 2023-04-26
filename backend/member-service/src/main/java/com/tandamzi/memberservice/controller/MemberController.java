package com.tandamzi.memberservice.controller;

import com.tandamzi.memberservice.common.annotation.LoginMember;
import com.tandamzi.memberservice.common.response.ResponseService;
import com.tandamzi.memberservice.common.result.ListResult;
import com.tandamzi.memberservice.common.result.Result;
import com.tandamzi.memberservice.common.result.SingleResult;
import com.tandamzi.memberservice.domain.Member;
import com.tandamzi.memberservice.dto.MemberResponseDto;
import com.tandamzi.memberservice.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/member")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;
    private final ResponseService responseService;

    @GetMapping
    public SingleResult<MemberResponseDto> findMyInfo(@LoginMember Member member){
        log.info("MemberController findMyInfo 실행");
        MemberResponseDto responseDto = MemberResponseDto.create(member);
        return responseService.getSingleResult(responseDto);
    }

    @PutMapping("/nickname")
    public Result changeNickname(@LoginMember Member member, @RequestBody String nickname){
        log.info("MemberController changeNickname 실행");
        memberService.changeNickname(member, nickname);
        return responseService.getSuccessResult();
    }

    @PutMapping("/alarm")
    public Result changeAlarm(@LoginMember Member member){
        log.info("MemberController changeAlarm 실행");
        memberService.changeAlarm(member);
        return responseService.getSuccessResult();
    }

    @GetMapping("/search")
    public SingleResult<List<Long>> findMemberIdFromNickname(@RequestParam("nickname") String nickname){
        log.info("MemberController findMemberIdFromNickname 실행 -> nickname = {}", nickname);
        List<Long> requestDto = memberService.findMemberIdFromNickname(nickname);
        return responseService.getSingleResult(requestDto);
    }

}
