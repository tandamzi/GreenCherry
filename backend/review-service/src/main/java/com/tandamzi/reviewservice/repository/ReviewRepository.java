package com.tandamzi.reviewservice.repository;

import com.tandamzi.reviewservice.domain.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    List<Review> findByStoreId(@Param("storeId") Long storeId);

    Page<Review> findPageByStoreId(@Param("storeId") Long storeId, Pageable pageable);

    Long countReviewByStoreId(@Param("storeId") Long storeId);

    boolean existsByOrderId(@Param("orderId") Long orderId);

}
