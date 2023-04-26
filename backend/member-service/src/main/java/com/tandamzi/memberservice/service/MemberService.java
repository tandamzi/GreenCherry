package com.tandamzi.memberservice.service;


import com.tandamzi.memberservice.domain.Member;
import com.tandamzi.memberservice.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;

    @Transactional
    public void changeNickname(Member member, String nickname){
        log.info("MemberService changeNickname 실행");
        member.changeNickname(nickname);
    }

    @Transactional
    public void changeAlarm(Member member){
        log.info("MemberService changeAlarm 실행");
        member.changeAlarm();
    }

}
