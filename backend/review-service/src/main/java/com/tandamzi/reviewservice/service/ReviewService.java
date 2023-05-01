package com.tandamzi.reviewservice.service;

import com.tandamzi.reviewservice.domain.Review;
import com.tandamzi.reviewservice.domain.ReviewImage;
import com.tandamzi.reviewservice.domain.ReviewTag;
import com.tandamzi.reviewservice.domain.Tag;
import com.tandamzi.reviewservice.dto.review.ReviewRegisterRequestDto;
import com.tandamzi.reviewservice.exception.tag.TagNotFoundException;
import com.tandamzi.reviewservice.repository.ReviewRepository;
import com.tandamzi.reviewservice.repository.TagRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ReviewService {

    private final S3Service s3Service;
    private final ReviewRepository reviewRepository;
    private final TagRepository tagRepository;

    @Transactional
    public void registerReview(ReviewRegisterRequestDto reviewRegisterRequestDto, List<MultipartFile> images) throws IOException {
        log.info("ReviewService registerReview 실행");

        Review review = reviewRegisterRequestDto.toEntity();

        List<ReviewTag> reviewTags = reviewRegisterRequestDto.getTags().stream()
                .map(id -> tagRepository.findById(id).orElseThrow(TagNotFoundException::new))
                .map(tag -> ReviewTag.builder()
                        .memberId(reviewRegisterRequestDto.getMemberId())
                        .tag(tag)
                        .review(review)
                        .build()
                )
                .collect(Collectors.toList());

        List<ReviewImage> reviewImages = s3Service.uploadFiles(images, "review").stream()
                .map(url -> ReviewImage.builder()
                        .url(url)
                        .review(review)
                        .build()
                ).collect(Collectors.toList());

        review.getReviewTags().addAll(reviewTags);
        review.getReviewImages().addAll(reviewImages);

        reviewRepository.save(review);
    }
}
