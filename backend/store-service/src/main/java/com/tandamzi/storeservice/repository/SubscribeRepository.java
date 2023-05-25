package com.tandamzi.storeservice.repository;

import com.tandamzi.storeservice.domain.Store;
import com.tandamzi.storeservice.domain.Subscribe;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Repository
public interface SubscribeRepository extends JpaRepository<Subscribe, Long> {
    void deleteByStoreAndMemberId(Store store, Long memberId);
    List<Subscribe> findAllByStore(Store store);
    Long countByStoreId(Long storeId);
    Page<Subscribe> findAllByMemberId(Long memberId, Pageable pageable);
    Optional<Subscribe> findByMemberIdAndStoreId(Long memberId, Long storeId);
}
