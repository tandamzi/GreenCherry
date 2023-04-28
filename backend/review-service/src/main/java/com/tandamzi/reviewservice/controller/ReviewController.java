package com.tandamzi.reviewservice.controller;

import com.tandamzi.reviewservice.common.response.ResponseService;
import com.tandamzi.reviewservice.common.result.ListResult;
import com.tandamzi.reviewservice.dto.TagResponseDto;
import com.tandamzi.reviewservice.service.TagService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/review")
@RequiredArgsConstructor
public class ReviewController {

    private final TagService tagService;
    private final ResponseService responseService;

    @GetMapping("/tag")
    public ListResult<TagResponseDto> findTags(){
        List<TagResponseDto> responseDto = tagService.findTags();
        return responseService.getListResult(responseDto);
    }
}
