package com.tandamzi.reviewservice.dto.review;

import com.tandamzi.reviewservice.domain.Review;
import com.tandamzi.reviewservice.domain.ReviewImage;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class MyReviewDto {

    private LocalDateTime createDate;
    private String content;
    private List<String> reviewImageUrls;
    private List<String> tags;

    public static MyReviewDto create(Review review){
        return MyReviewDto.builder()
                .createDate(review.getCreateDate())
                .content(review.getContent())
                .reviewImageUrls(
                        review.getReviewImages()
                                .stream()
                                .map(ReviewImage::getUrl)
                                .collect(Collectors.toList())
                )
                .tags(
                        review.getReviewTags()
                                .stream()
                                .map(rt -> rt.getTag().getName())
                                .collect(Collectors.toList())
                )
                .build();
    }
}
