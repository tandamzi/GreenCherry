package com.tandamzi.memberservice.service;


import com.tandamzi.memberservice.domain.Member;
import com.tandamzi.memberservice.dto.MemberForOrderDto;
import com.tandamzi.memberservice.exception.member.MemberNotFoundException;
import com.tandamzi.memberservice.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final S3Service s3Service;

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

    @Transactional
    public String changeImage(Member member, MultipartFile multipartFile) throws IOException {
        log.info("MemberService changeImage 실행");
        String imageUrl = s3Service.uploadFile(multipartFile, "member-profile");
        member.changeImage(imageUrl);
        return imageUrl;
    }

    public List<MemberForOrderDto> findMemberForOrder(String nickname, List<Long> memberIds){
        log.info("MemberService findMemberForOrder 실행 -> nickname = {}, memberIds = {}", nickname, memberIds);

        return memberRepository.findMemberForOrder(nickname, memberIds).stream()
                .map(m -> new MemberForOrderDto(m.getId(), m.getNickname()))
                .collect(Collectors.toList());
    }

//    public String findNickname(Long memberId){
//        log.info("MemberService findNickname 실행 -> memberId = {}", memberId);
//        Member member = memberRepository.findById(memberId).orElseThrow(MemberNotFoundException::new);
//        return member.getNickname();
//    }

}
