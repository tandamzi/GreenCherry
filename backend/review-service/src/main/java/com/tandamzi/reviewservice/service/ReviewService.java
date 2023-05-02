package com.tandamzi.reviewservice.service;

import com.tandamzi.reviewservice.domain.Review;
import com.tandamzi.reviewservice.domain.ReviewImage;
import com.tandamzi.reviewservice.domain.ReviewTag;
import com.tandamzi.reviewservice.domain.Tag;
import com.tandamzi.reviewservice.dto.member.MemberDto;
import com.tandamzi.reviewservice.dto.review.ReviewRegisterRequestDto;
import com.tandamzi.reviewservice.dto.review.ReviewResponseDto;
import com.tandamzi.reviewservice.dto.tag.TagStatsDto;
import com.tandamzi.reviewservice.exception.tag.TagNotFoundException;
import com.tandamzi.reviewservice.feign.MemberServiceClient;
import com.tandamzi.reviewservice.repository.ReviewRepository;
import com.tandamzi.reviewservice.repository.TagRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
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
    private final MemberServiceClient memberServiceClient;

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

        List<ReviewImage> reviewImages = new ArrayList<>();
        if(images != null && images.size() != 0) {
            reviewImages = s3Service.uploadFiles(images, "review").stream()
                    .map(url -> ReviewImage.builder()
                            .url(url)
                            .review(review)
                            .build()
                    ).collect(Collectors.toList());
        }

        review.getReviewTags().addAll(reviewTags);
        review.getReviewImages().addAll(reviewImages);

        reviewRepository.save(review);
    }

    public Page<ReviewResponseDto> reviewList(Long storeId, Pageable pageable){
        Page<Review> reviews = reviewRepository.findPageByStoreId(storeId, pageable);

        HashSet<Long> memberIds = new HashSet<>();
        reviews.stream().forEach(r -> memberIds.add(r.getMemberId()));

        HashMap<Long, String> memberNicknames = new HashMap<>();
        memberServiceClient.findMember(null, new ArrayList<>(memberIds))
                .getData()
                .forEach(m -> memberNicknames.putIfAbsent(m.getMemberId(), m.getNickname()));

         return reviews.map(r -> ReviewResponseDto.create(r, memberNicknames));
    }

    public List<TagStatsDto> statsTag(Long storeId){
        List<Review> reviews = reviewRepository.findByStoreId(storeId);

        HashMap<Long, Integer> tagCount = new HashMap<>();
        reviews.forEach(r ->
                r.getReviewTags().forEach(
                        rt -> tagCount.put(rt.getTag().getId(), tagCount.getOrDefault(rt.getTag().getId(), 0)+1)
                )
        );

        List<Tag> tags = tagRepository.findAll();
        HashMap<Long, String> tagNames = new HashMap<>();
        tags.forEach(t -> tagNames.put(t.getId(), t.getName()));

        List<TagStatsDto> result = new ArrayList<>();
        for (Long id : tagCount.keySet()) {
            result.add(
                    TagStatsDto.builder()
                            .id(id)
                            .name(tagNames.get(id))
                            .count(tagCount.get(id))
                            .build()
            );
        }

        result.sort((t1, t2) -> t2.getCount() - t1.getCount());
        return result;
    }
}
