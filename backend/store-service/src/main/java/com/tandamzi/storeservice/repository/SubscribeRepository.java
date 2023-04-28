package com.tandamzi.storeservice.repository;

import com.tandamzi.storeservice.domain.Store;
import com.tandamzi.storeservice.domain.Subscribe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SubscribeRepository extends JpaRepository<Subscribe, Long> {
    void deleteByStoreAndMemberId(Store store, Long memberId);
}
