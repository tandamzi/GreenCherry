package com.tandamzi.reviewservice.dto.review;

import com.tandamzi.reviewservice.domain.Review;
import com.tandamzi.reviewservice.domain.ReviewImage;
import com.tandamzi.reviewservice.domain.ReviewTag;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class ReviewRegisterRequestDto {

    private Long memberId;
    private Long storeId;
    private Long orderId;
    private String content;
    private List<Long> tags;

    public Review toEntity(){
        return Review.builder()
                .memberId(memberId)
                .storeId(storeId)
                .orderId(orderId)
                .content(content)
                .reviewImages(new ArrayList<>())
                .reviewTags(new ArrayList<>())
                .build();
    }
}
