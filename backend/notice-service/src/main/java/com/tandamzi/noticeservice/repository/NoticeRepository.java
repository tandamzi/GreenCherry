package com.tandamzi.noticeservice.repository;

import com.tandamzi.noticeservice.domain.Notice;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NoticeRepository extends JpaRepository<Notice,Long> {
    Page<Notice> findByMemberId(Long memberId, Pageable pageable);
}
