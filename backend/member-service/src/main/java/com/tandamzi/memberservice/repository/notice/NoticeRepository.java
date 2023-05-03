package com.tandamzi.memberservice.repository.notice;

import com.tandamzi.memberservice.domain.Member;
import com.tandamzi.memberservice.domain.Notice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface NoticeRepository extends JpaRepository<Notice, Long> {

    Optional<Notice> findByMember(@Param("member") Member member);
}
