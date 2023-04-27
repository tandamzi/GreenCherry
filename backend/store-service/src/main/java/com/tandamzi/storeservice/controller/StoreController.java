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
import com.tandamzi.storeservice.service.S3Service;
import com.tandamzi.storeservice.service.CherryBoxService;
import com.tandamzi.storeservice.service.StoreService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/store")
@RequiredArgsConstructor
public class StoreController {
    private final StoreService storeService;
    private final ResponseService responseService;
    private final S3Service s3Service;

    private final CherryBoxService cherryBoxService;

    @RequestMapping("/test")
    public String test() {
        return "Hello World";
    }

    @PostMapping
    public Result registerStore(@RequestBody RegisterStoreRequestDto registerStoreRequestDto) {
        log.info("registerStoreRequestDto: {}", registerStoreRequestDto);
        storeService.registerStore(registerStoreRequestDto);
        return responseService.getSuccessResult();
    }

    @GetMapping("/{store-id}")
    public SingleResult<StoreDetailResponseDto> searchStoreDetail(@PathVariable("store-id") Long storeId) {
        log.info("storeId: {}", storeId);
        StoreDetailResponseDto storeDetailResponseDto = storeService.getStoreDetail(storeId);
        return responseService.getSingleResult(storeDetailResponseDto);
    }

    @GetMapping("type")
    public SingleResult<List<TypeResponseDto>> getTypes() {
        log.info("getTypes() 진입");
        return responseService.getSingleResult(storeService.getTypes());
    }

    @GetMapping("allergy")
    public SingleResult<List<AllergyResponseDto>> getAllergies() {
        log.info("getAllergies() 진입");
        return responseService.getSingleResult(storeService.getAllergies());
    }

    @GetMapping("{store-id}/cherrybox")
    public SingleResult<CherryBoxResponseDto> getCherryBox(@PathVariable("store-id") Long storeId) {
        log.info("storeId: {}", storeId);
        return responseService.getSingleResult(storeService.getCherryBox(storeId));
    }

    @PutMapping("{store-id}/cherrybox")
    public Result updateCherryBox(@PathVariable("store-id") Long storeId, @RequestBody CherryBoxRequestDto cherryBoxRequestDto) {
        log.info("storeId: {}, cherryBoxRequestDto: {}", storeId, cherryBoxRequestDto);
        storeService.updateCherryBox(storeId, cherryBoxRequestDto);
        return responseService.getSuccessResult();
    }

    @PostMapping("{store-id}/subscribe")
    public Result subscribeStore(@PathVariable("store-id") Long storeId, @RequestParam Long memberId) {
        log.info("storeId: {}, memberId: {}", storeId, memberId);
        storeService.subscribeStore(storeId, memberId);
        return responseService.getSuccessResult();
    }

    @DeleteMapping("{store-id}/subscribe")
    public Result deleteSubscribe(@PathVariable("store-id") Long storeId, @RequestParam Long memberId) {
        log.info("storeId: {}, memberId: {}", storeId, memberId);
        storeService.deleteSubscribe(storeId, memberId);
        return responseService.getSuccessResult();
    }
    @PutMapping("{store-id}/cherryboxQuantity")
    public Result decreaseCherrybox(@PathVariable("store-id") Long storeId, @RequestBody int orderQuantity){
        log.info("[StoreController] decreaseCherrybox => storeId :{} , orderQuantity:{} ",storeId,orderQuantity);
        cherryBoxService.decreaseCherryBox(storeId, orderQuantity);
        return responseService.getSuccessResult();
    }

    @PutMapping("update-image")
    public SingleResult<String> registerImage(@RequestParam ("file")MultipartFile file) throws IOException {
        String url = s3Service.uploadFileV2(file,"/test");
        return responseService.getSingleResult(url);
    }

}
