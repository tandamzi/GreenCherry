package com.tandamzi.memberservice.repository.member;

import com.tandamzi.memberservice.domain.Member;

import java.util.List;

public interface MemberRepositoryCustom {

    List<Member> findMemberForOrder(String nickname, List<Long> memberIds);

}
