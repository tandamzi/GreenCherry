package com.tandamzi.storeservice.repository;

import com.tandamzi.storeservice.domain.Store;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface StoreRepositoryCustom {
    Page<Store> findNearbyPlacesWithSubscription(long memberId, double radius, double latitude, double longitude, boolean sub, Pageable pageable);
}
