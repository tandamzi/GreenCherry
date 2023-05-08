package com.tandamzi.noticeservice.controller;

import com.tandamzi.noticeservice.response.ResponseService;
import com.tandamzi.noticeservice.service.NoticeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/notice")
public class NoticeController {

    private final NoticeService noticeService;

    @PostMapping("/test")
    public String test(@RequestBody List<String> tokens){
        noticeService.sendNotice(tokens);
        return "success";
    }

}
