package com.tandamzi.storeservice.controller;

import com.tandamzi.storeservice.common.response.ResponseService;
import com.tandamzi.storeservice.common.result.Result;
import com.tandamzi.storeservice.dto.request.RegisterStoreRequestDto;
import com.tandamzi.storeservice.service.StoreService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/store")
@RequiredArgsConstructor
public class StoreController {
    private final StoreService storeService;

    private final ResponseService responseService;
    @RequestMapping("/test")
    public String test() {
        return "Hello World";
    }

    // 가게 등록
    @PostMapping("")
    public Result registerStore(@RequestBody RegisterStoreRequestDto registerStoreRequestDto) {
        storeService.registerStore(registerStoreRequestDto);

        return responseService.getSuccessResult();
    }
}
