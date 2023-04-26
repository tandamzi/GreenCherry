package com.tandamzi.storeservice.controller;

import com.tandamzi.storeservice.common.response.ResponseService;
import com.tandamzi.storeservice.common.result.Result;
import com.tandamzi.storeservice.common.result.SingleResult;
import com.tandamzi.storeservice.dto.request.CherryBoxRequestDto;
import com.tandamzi.storeservice.dto.request.RegisterStoreRequestDto;
import com.tandamzi.storeservice.dto.response.AllergyResponseDto;
import com.tandamzi.storeservice.dto.response.CherryBoxResponseDto;
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
        StoreDetailResponseDto storeDetailResponseDto = storeService.getStoreDetail(storeId);
        return responseService.getSingleResult(storeDetailResponseDto);
    }


    @GetMapping("type")
    public SingleResult<List<TypeResponseDto>> getTypes() {
        return responseService.getSingleResult(storeService.getTypes());
    }

    @GetMapping("allergy")
    public SingleResult<List<AllergyResponseDto>> getAllergies() {
        return responseService.getSingleResult(storeService.getAllergies());
    }

    @GetMapping("{storeId}/cherrybox")
    public SingleResult<CherryBoxResponseDto> getCherryBox(@PathVariable("storeId") Long storeId) {
        return responseService.getSingleResult(storeService.getCherryBox(storeId));
    }

    @PostMapping("{storeId}/cherrybox")
    public Result registerCherryBox(@PathVariable("storeId") Long storeId, @RequestBody CherryBoxRequestDto cherryBoxRequestDto) {
        storeService.registerCherryBox(storeId, cherryBoxRequestDto);
        return responseService.getSuccessResult();
    }

    @PostMapping("{storeId}/subscribe")
    public Result subscribeStore(@PathVariable("storeId") Long storeId, @RequestParam Long memberId) {
        storeService.subscribeStore(storeId, memberId);
        return responseService.getSuccessResult();
    }

    @DeleteMapping("{storeId}/subscribe")
    public Result deleteSubscribe(@PathVariable("storeId") Long storeId, @RequestParam Long memberId) {
        log.info("storeId: {}, memberId: {}", storeId, memberId);
        storeService.deleteSubscribe(storeId, memberId);
        return responseService.getSuccessResult();
    }

}
