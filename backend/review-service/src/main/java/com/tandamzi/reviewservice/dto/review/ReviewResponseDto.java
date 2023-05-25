package com.tandamzi.reviewservice.dto.review;

import com.tandamzi.reviewservice.domain.Review;
import com.tandamzi.reviewservice.domain.ReviewImage;
import com.tandamzi.reviewservice.dto.member.MemberDto;
import lombok.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class ReviewResponseDto {

    private String memberNickname;
    private String memberImageUrl;
    private LocalDateTime createDate;
    private String content;
    private List<String> reviewImageUrls;
    private List<String> tags;

    public static ReviewResponseDto create(Review review, HashMap<Long, MemberDto> memberNicknames){
        return ReviewResponseDto.builder()
                .memberNickname(memberNicknames.get(review.getMemberId()).getNickname())
                .memberImageUrl(memberNicknames.get(review.getMemberId()).getMemberImageUrl())
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
