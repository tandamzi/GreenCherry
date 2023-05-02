package com.tandamzi.storeservice.controller;

import com.tandamzi.storeservice.common.response.ResponseService;
import com.tandamzi.storeservice.common.result.Result;
import com.tandamzi.storeservice.common.result.SingleResult;
import com.tandamzi.storeservice.dto.request.BusinessValidationRequestDto;
import com.tandamzi.storeservice.dto.request.CherryBoxRequestDto;
import com.tandamzi.storeservice.dto.request.RegisterStoreRequestDto;
import com.tandamzi.storeservice.dto.request.UpdateStoreRequestDto;
import com.tandamzi.storeservice.dto.response.*;
import com.tandamzi.storeservice.service.S3Service;
import com.tandamzi.storeservice.service.CherryBoxService;
import com.tandamzi.storeservice.service.StoreService;
import com.tandamzi.storeservice.service.ValidationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URISyntaxException;
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
    private final ValidationService validationService;

    @RequestMapping("/test")
    public String test() {
        return "Hello World";
    }

    /*
    쿼리파라미터 sub=true : 구독한 가게 목록
    쿼리파라미터 sub 없으면 : 주변 가게 목록
    쿼리파라미터 lat=123&lng=29 : 위도, 경도
     */
    @GetMapping
    public SingleResult<Page<StoreResponseDto>> getStore(@RequestParam Long memberId,
                                                         @RequestParam double lat, @RequestParam double lng,
                                                         @RequestParam boolean sub, @RequestParam(defaultValue = "3") double radius,
                                                         @PageableDefault(size = 50) Pageable pageable) {
        log.info("getStore lat: {}, lng: {}, sub: {}", lat, lng, sub);
        Page<StoreResponseDto> storeResponseDtoPage = storeService.getStores(memberId, radius, lat, lng, sub, pageable);
        return responseService.getSingleResult(storeResponseDtoPage);
    }

    @PostMapping
    public Result registerStore(@RequestPart RegisterStoreRequestDto registerStoreRequestDto, @RequestPart(required = false) List<MultipartFile> images) throws IOException {
        log.info("registerStoreRequestDto: {}", registerStoreRequestDto);
        storeService.registerStore(registerStoreRequestDto, images);
        return responseService.getSuccessResult();
    }

    @GetMapping("/{store-id}")
    public SingleResult<StoreDetailResponseDto> searchStoreDetail(@PathVariable("store-id") Long storeId) {
        log.info("searchStoreDetail 진입 storeId: {}", storeId);
        StoreDetailResponseDto storeDetailResponseDto = storeService.getStoreDetail(storeId);
        return responseService.getSingleResult(storeDetailResponseDto);
    }

    @PutMapping("/{store-id}")
    public Result updateStore(@PathVariable("store-id") Long storeId, @RequestPart(required = false) UpdateStoreRequestDto storeRequestDto, @RequestPart(required = false) List<MultipartFile> images) throws IOException {
        log.info("updateStore 진입 storeRequestDto: {}", storeRequestDto);
        storeService.updateStoreAndImage(storeId, storeRequestDto, images);

        return responseService.getSuccessResult();
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

    @PutMapping("{store-id}/cherrybox-quantity")
    public Result decreaseCherryBox(@PathVariable("store-id") Long storeId, @RequestBody int orderQuantity) {
        log.info("[StoreController] decreaseCherrybox => storeId :{} , orderQuantity:{} ", storeId, orderQuantity);
        cherryBoxService.decreaseCherryBox(storeId, orderQuantity);
        return responseService.getSuccessResult();
    }

    @PostMapping("business-license")
    public Result validateBusinessLicense(@RequestBody BusinessValidationRequestDto dto) throws UnsupportedEncodingException, URISyntaxException {
        validationService.isValidBusinessLicense(dto);
        return responseService.getSuccessResult();
    }

    @GetMapping("business-permission")
    public SingleResult<?> validateBusinessPermission(@RequestParam String businessPermissionNumber) {
        PermissionValidationApiResponseDto validationDto = validationService.isValidBusinessPermission(businessPermissionNumber);
        return responseService.getSingleResult(validationDto);
    }

}
