package com.tandamzi.memberservice.service;


import com.tandamzi.memberservice.domain.Member;
import com.tandamzi.memberservice.domain.Notice;
import com.tandamzi.memberservice.dto.member.MemberForOrderDto;
import com.tandamzi.memberservice.dto.member.MemberForReviewDto;
import com.tandamzi.memberservice.repository.member.MemberRepository;
import com.tandamzi.memberservice.repository.notice.NoticeRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final NoticeRepository noticeRepository;
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

    public List<MemberForReviewDto> findMemberForReview(List<Long> memberIds){
        log.info("MemberService findMemberForReview 실행 -> memberIds = {}", memberIds);

        return memberRepository.findByIdIn(memberIds).stream()
                .map(m -> new MemberForReviewDto(m.getId(), m.getNickname(), m.getImage()))
                .collect(Collectors.toList());
    }

    @Transactional
    public void noticeMember(Member member, String token){
        log.info("MemberService noticeMember 실행");
        Optional<Notice> optional = noticeRepository.findByMember(member);

        Notice notice = null;
        if(optional.isPresent()){
            notice = optional.get();
            notice.change(token);
        } else{
            notice = noticeRepository.save(
                    Notice.builder()
                            .token(token)
                            .member(member)
                            .build()
            );
        }

        member.permitNotice(notice);
    }

    public List<String> getTokens(List<Long> memberIdList){
        log.info("MemberService getTokens 실행");
        List<Member> members = memberRepository.findWithNoticeByIdIn(memberIdList);

        return members.stream()
                .map(m -> m.getNotice().getToken())
                .collect(Collectors.toList());
    }

    public Long getTotalMemberNumber(){
        log.info("MemberService getTotalMemberNumber 실행");
        Long members = memberRepository.countAllMembers();
        return members;
    }
}
