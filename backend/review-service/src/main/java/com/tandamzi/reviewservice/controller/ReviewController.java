package com.tandamzi.reviewservice.controller;

import com.tandamzi.reviewservice.common.response.ResponseService;
import com.tandamzi.reviewservice.common.result.ListResult;
import com.tandamzi.reviewservice.common.result.Result;
import com.tandamzi.reviewservice.common.result.SingleResult;
import com.tandamzi.reviewservice.dto.review.MyReviewDto;
import com.tandamzi.reviewservice.dto.review.ReviewRegisterRequestDto;
import com.tandamzi.reviewservice.dto.review.ReviewResponseDto;
import com.tandamzi.reviewservice.dto.tag.TagResponseDto;
import com.tandamzi.reviewservice.dto.tag.TagStatsDto;
import com.tandamzi.reviewservice.service.ReviewService;
import com.tandamzi.reviewservice.service.TagService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/review")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;
    private final TagService tagService;
    private final ResponseService responseService;

    @GetMapping("/tag")
    public ListResult<TagResponseDto> findTags(){
        log.info("ReviewController findTags 실행");
        List<TagResponseDto> responseDto = tagService.findTags();
        return responseService.getListResult(responseDto);
    }

    @PostMapping
    public Result registerReview(@RequestPart ReviewRegisterRequestDto reviewRegisterRequestDto,
                                 @RequestPart(required = false) List<MultipartFile> images) throws IOException {
        log.info("ReviewController registerReview 실행");
        reviewService.registerReview(reviewRegisterRequestDto, images);
        return responseService.getSuccessResult();
    }

    @GetMapping
    public SingleResult<Page<ReviewResponseDto>> reviewList(@RequestParam("store-id") Long storeId,
                                                            @PageableDefault(size = 10) Pageable pageable){
        log.info("ReviewController reviewList 실행 -> storeId = {}", storeId);
        Page<ReviewResponseDto> responseDto = reviewService.reviewList(storeId, pageable);
        return responseService.getSingleResult(responseDto);
    }

    @GetMapping("/tag/stats")
    public ListResult<TagStatsDto> statsTag(@RequestParam("store-id") Long storeId){
        log.info("ReviewController statsTag 실행 -> storeId = {}", storeId);
        List<TagStatsDto> responseDto = reviewService.statsTag(storeId);
        return responseService.getListResult(responseDto);
    }

    @GetMapping("/count")
    public SingleResult<Long> countReview(@RequestParam("store-id") Long storeId){
        log.info("ReviewController countReview 실행 -> storeId = {}", storeId);
        Long count = reviewService.countReview(storeId);
        return responseService.getSingleResult(count);
    }

    @GetMapping("/exist")
    public SingleResult<List<Long>> existReviewByOrder(@RequestParam("orderList") List<Long> orderList){
        log.info("ReviewController existReviewByOrder 실행 -> orderList = {}", orderList);
        List<Long> existList = reviewService.existReviewByOrder(orderList);
        return responseService.getSingleResult(existList);
    }

    @GetMapping("/myReview")
    public SingleResult<Page<MyReviewDto>> myReviewList(@RequestParam("member-id") Long memberId,
                                                        @PageableDefault(size = 10) Pageable pageable){
        log.info("ReviewController myReviewList 실행 -> memberId = {}", memberId);
        Page<MyReviewDto> responseDto = reviewService.myReviewList(memberId, pageable);
        return responseService.getSingleResult(responseDto);
    }
}
