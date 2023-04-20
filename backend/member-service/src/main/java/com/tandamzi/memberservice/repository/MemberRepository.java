package com.tandamzi.memberservice.repository;

import com.tandamzi.memberservice.common.config.security.oauth2.userinfo.AuthProvider;
import com.tandamzi.memberservice.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {

    Optional<Member> findByEmailAndProvider(String email, AuthProvider authProvider);
}
