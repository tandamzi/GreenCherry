package com.tandamzi.memberservice.controller;

import com.tandamzi.memberservice.common.annotation.LoginMember;
import com.tandamzi.memberservice.common.response.ResponseService;
import com.tandamzi.memberservice.common.result.Result;
import com.tandamzi.memberservice.common.result.SingleResult;
import com.tandamzi.memberservice.domain.Member;
import com.tandamzi.memberservice.dto.MemberResponseDto;
import com.tandamzi.memberservice.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
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

    @PutMapping("/image")
    public SingleResult<String> changeImage(@LoginMember Member member, MultipartFile profileImage) throws IOException {
        log.info("MemberController changeImage 실행 by memberId = {}", member.getId());
        String imageUrl = memberService.changeImage(member, profileImage);
        return responseService.getSingleResult(imageUrl);
    }

    @GetMapping("/search")
    public SingleResult<List<Long>> findMemberIdFromNickname(@RequestParam("nickname") String nickname){
        log.info("MemberController findMemberIdFromNickname 실행 -> nickname = {}", nickname);
        List<Long> requestDto = memberService.findMemberIdFromNickname(nickname);
        return responseService.getSingleResult(requestDto);
    }

    @GetMapping("/{member-id}/nickname")
    public SingleResult<String> findNickname(@PathVariable("member-id") Long memberId){
        log.info("MemberController findNickname 실행 -> memberId = {}", memberId);
        String nickname = memberService.findNickname(memberId);
        return responseService.getSingleResult(nickname);
    }
}
