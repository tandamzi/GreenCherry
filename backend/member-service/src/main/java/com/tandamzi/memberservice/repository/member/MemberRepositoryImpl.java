package com.tandamzi.memberservice.repository.member;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.tandamzi.memberservice.domain.Member;

import javax.persistence.EntityManager;
import java.util.List;

import static com.tandamzi.memberservice.domain.QMember.*;

public class MemberRepositoryImpl implements MemberRepositoryCustom{

    private final JPAQueryFactory queryFactory;

    public MemberRepositoryImpl(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }

    @Override
    public List<Member> findMemberForOrder(String nickname, List<Long> memberIds) {
        return queryFactory.selectFrom(member)
                .where(nicknameContain(nickname), memberIdIn(memberIds))
                .fetch();
    }

    private BooleanExpression nicknameContain(String nickname){
        return nickname != null ? member.nickname.contains(nickname) : null;
    }

    private BooleanExpression memberIdIn(List<Long> memberIds){
        return memberIds != null ? member.id.in(memberIds) : null;
    }
}
