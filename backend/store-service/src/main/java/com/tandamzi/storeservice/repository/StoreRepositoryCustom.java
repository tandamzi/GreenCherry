package com.tandamzi.storeservice.repository;

import com.tandamzi.storeservice.domain.Store;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface StoreRepositoryCustom {
    Page<Store> findNearbyPlacesWithSubscription(long memberId, double radius, double latitude, double longitude, boolean sub, Pageable pageable);

    //memberId와 storeId로 동적쿼리 가게 조회
    Optional<Store> findStoreByIdAndMember(Long memberId, Long storeId);

}
