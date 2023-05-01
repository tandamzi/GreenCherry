package com.tandamzi.reviewservice.repository;

import com.tandamzi.reviewservice.domain.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    Page<Review> findPageByStoreId(@Param("storeId") Long storeId, Pageable pageable);

}
