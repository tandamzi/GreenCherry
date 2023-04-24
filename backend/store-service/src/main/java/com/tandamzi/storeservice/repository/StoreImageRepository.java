package com.tandamzi.storeservice.repository;

import com.tandamzi.storeservice.domain.StoreImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StoreImageRepository extends JpaRepository<StoreImage, Long> {
}
