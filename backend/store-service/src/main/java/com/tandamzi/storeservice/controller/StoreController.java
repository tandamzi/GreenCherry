package com.tandamzi.storeservice.controller;

import com.tandamzi.storeservice.common.response.ResponseService;
import com.tandamzi.storeservice.common.result.Result;
import com.tandamzi.storeservice.common.result.SingleResult;
import com.tandamzi.storeservice.dto.request.RegisterStoreRequestDto;
import com.tandamzi.storeservice.dto.response.StoreDetailResponseDto;
import com.tandamzi.storeservice.dto.response.TypeResponseDto;
import com.tandamzi.storeservice.service.StoreService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @PostMapping
    public Result registerStore(@RequestBody RegisterStoreRequestDto registerStoreRequestDto) {
        storeService.registerStore(registerStoreRequestDto);
        return responseService.getSuccessResult();
    }

    @GetMapping("/{storeId}")
    public SingleResult<StoreDetailResponseDto> searchStoreDetail(@PathVariable("storeId") Long storeId) {
        log.info("storeId: {}", storeId);
        StoreDetailResponseDto storeDetailResponseDto = storeService.searchStoreDetail(storeId);
        return responseService.getSingleResult(storeDetailResponseDto);
    }

    /*@PostMapping("{storeId}/subscribe")
    public Result subscribeStore(@PathVariable("storeId") Long storeId) {
        storeService.subscribeStore(storeId);
        return responseService.getSuccessResult();
    }*/

    @GetMapping("type")
    public SingleResult<List<TypeResponseDto>> getTypes(){
        return responseService.getSingleResult(storeService.getTypes());
    }

}
