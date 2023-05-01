package com.tandamzi.reviewservice.repository;

import com.tandamzi.reviewservice.domain.Review;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Review, Long> {

}
