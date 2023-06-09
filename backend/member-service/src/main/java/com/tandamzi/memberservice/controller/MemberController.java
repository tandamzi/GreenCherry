package com.tandamzi.memberservice.controller;

import com.tandamzi.memberservice.common.annotation.LoginMember;
import com.tandamzi.memberservice.common.response.ResponseService;
import com.tandamzi.memberservice.common.result.ListResult;
import com.tandamzi.memberservice.common.result.Result;
import com.tandamzi.memberservice.common.result.SingleResult;
import com.tandamzi.memberservice.domain.Member;
import com.tandamzi.memberservice.dto.member.MemberForOrderDto;
import com.tandamzi.memberservice.dto.member.MemberForReviewDto;
import com.tandamzi.memberservice.dto.member.MemberNoticeDto;
import com.tandamzi.memberservice.dto.member.MemberResponseDto;
import com.tandamzi.memberservice.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
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

    @Autowired
    Environment env;

    @GetMapping("/test")
    public String test(){
        return env.getProperty("app.auth.tokenSecret");
    }

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
    public SingleResult<List<MemberForOrderDto>> findMemberForOrder(@RequestParam(value = "nickname", required = false) String nickname,
                                                       @RequestParam(value = "memberIds", required = false) List<Long> memberIds){
        log.info("MemberController findMemberForOrder 실행 -> nickname = {}, memberIds = {}", nickname, memberIds);
        List<MemberForOrderDto> requestDto = memberService.findMemberForOrder(nickname, memberIds);
        return responseService.getSingleResult(requestDto);
    }

    @GetMapping("/search-for-review")
    public SingleResult<List<MemberForReviewDto>> findMemberForReview(@RequestParam(value = "memberIds") List<Long> memberIds){
        log.info("MemberController findMemberForReview 실행 -> memberIds = {}", memberIds);
        List<MemberForReviewDto> requestDto = memberService.findMemberForReview(memberIds);
        return responseService.getSingleResult(requestDto);
    }

    @PostMapping("/notice")
    public Result noticeMember(@LoginMember Member member, @RequestBody MemberNoticeDto memberNoticeDto){
        log.info("MemberController noticeMember 실행");
        memberService.noticeMember(member, memberNoticeDto);
        return responseService.getSuccessResult();
    }

    @GetMapping("/token")
    public ListResult<String> getTokens(@RequestParam("memberIdList") List<Long> memberIdList){
        log.info("MemberController getTokens 실행 -> memberIdList = {}", memberIdList);
        List<String> responseDto = memberService.getTokens(memberIdList);
        return responseService.getListResult(responseDto);
    }

    @GetMapping("/total")
    public SingleResult<Long> getTotalMemberNumber(){
        log.info("MemberController getTotalMemberNumber 실행");
        Long totalMemberNumber = memberService.getTotalMemberNumber();
        return responseService.getSingleResult(totalMemberNumber);
    }

    @GetMapping("/{member-id}/nickname")
    public SingleResult<String> findMemberNickname(@PathVariable("member-id") Long memberId){
        log.info("MemberController findMemberNickname 실행 -> memberId = {}", memberId);
        String memberNickname = memberService.findMemberNickname(memberId);
        return responseService.getSingleResult(memberNickname);
    }
}
