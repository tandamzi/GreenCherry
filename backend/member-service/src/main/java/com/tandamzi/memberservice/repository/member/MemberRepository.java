package com.tandamzi.memberservice.repository.member;

import com.tandamzi.memberservice.common.config.security.oauth2.userinfo.AuthProvider;
import com.tandamzi.memberservice.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long>, MemberRepositoryCustom {

    Optional<Member> findByEmailAndProvider(String email, AuthProvider authProvider);

    List<Member> findByNicknameContaining(@Param("nickname") String nickname);
}
