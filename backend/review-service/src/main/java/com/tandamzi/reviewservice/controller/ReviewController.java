package com.tandamzi.reviewservice.controller;

import com.tandamzi.reviewservice.common.response.ResponseService;
import com.tandamzi.reviewservice.common.result.ListResult;
import com.tandamzi.reviewservice.common.result.Result;
import com.tandamzi.reviewservice.dto.review.ReviewRegisterRequestDto;
import com.tandamzi.reviewservice.dto.tag.TagResponseDto;
import com.tandamzi.reviewservice.service.ReviewService;
import com.tandamzi.reviewservice.service.TagService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
}
