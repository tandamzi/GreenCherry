package com.tandamzi.noticeservice.controller;

import com.tandamzi.noticeservice.common.response.ResponseService;
import com.tandamzi.noticeservice.common.result.SingleResult;
import com.tandamzi.noticeservice.dto.response.ListResponseDto;
import com.tandamzi.noticeservice.dto.response.NoticeListResponseDto;
import com.tandamzi.noticeservice.service.NoticeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/notice")
public class NoticeController {

    private final NoticeService noticeService;
    private final ResponseService responseService;

    @PostMapping("/test")
    public String test(@RequestBody List<String> tokens){
        noticeService.sendNotice(tokens);
        return "success";
    }

    @GetMapping("/list")
    public SingleResult<Page<ListResponseDto>> getNoticeList(@RequestParam("member-id") Long memberId,
                                         @PageableDefault(size= 10) Pageable pageable){
       log.info("[NoticeController] getNoticeList");

        Page<ListResponseDto> noticeList = noticeService.getNoticeList(memberId, pageable);
        return responseService.getSingleResult(noticeList);

    }

}
