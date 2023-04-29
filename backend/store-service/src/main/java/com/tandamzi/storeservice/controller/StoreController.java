package com.tandamzi.storeservice.controller;

import com.tandamzi.storeservice.common.response.ResponseService;
import com.tandamzi.storeservice.common.result.Result;
import com.tandamzi.storeservice.common.result.SingleResult;
import com.tandamzi.storeservice.dto.request.BusinessValidationRequestDto;
import com.tandamzi.storeservice.dto.request.CherryBoxRequestDto;
import com.tandamzi.storeservice.dto.request.RegisterStoreRequestDto;
import com.tandamzi.storeservice.dto.request.UpdateStoreRequestDto;
import com.tandamzi.storeservice.dto.response.AllergyResponseDto;
import com.tandamzi.storeservice.dto.response.CherryBoxResponseDto;
import com.tandamzi.storeservice.dto.response.StoreDetailResponseDto;
import com.tandamzi.storeservice.dto.response.TypeResponseDto;
import com.tandamzi.storeservice.service.S3Service;
import com.tandamzi.storeservice.service.CherryBoxService;
import com.tandamzi.storeservice.service.StoreService;
import com.tandamzi.storeservice.service.ValidationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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

    @PostMapping
    public Result registerStore(@RequestPart RegisterStoreRequestDto registerStoreRequestDto,
                                @RequestPart(required = false) List<MultipartFile> images) throws IOException {
        log.info("registerStoreRequestDto: {}", registerStoreRequestDto);
        storeService.registerStore(registerStoreRequestDto,images);
        return responseService.getSuccessResult();
    }

    @GetMapping("/{store-id}")
    public SingleResult<StoreDetailResponseDto> searchStoreDetail(@PathVariable("store-id") Long storeId) {
        log.info("searchStoreDetail 진입 storeId: {}", storeId);
        StoreDetailResponseDto storeDetailResponseDto = storeService.getStoreDetail(storeId);

        return responseService.getSingleResult(storeDetailResponseDto);
    }

    @PutMapping("/{store-id}")
    public Result updateStore(@PathVariable("store-id") Long storeId,
                              @RequestPart(required = false) UpdateStoreRequestDto storeRequestDto,
                              @RequestPart(required = false) List<MultipartFile> images) throws IOException {
        log.info("updateStore 진입 storeRequestDto: {}",storeRequestDto);
        storeService.updateStore(storeId, storeRequestDto, images);

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
    public Result decreaseCherryBox(@PathVariable("store-id") Long storeId, @RequestBody int orderQuantity){
        log.info("[StoreController] decreaseCherrybox => storeId :{} , orderQuantity:{} ",storeId,orderQuantity);
        cherryBoxService.decreaseCherryBox(storeId, orderQuantity);
        return responseService.getSuccessResult();
    }

    /* 이미지 업로드 테스트용. 나중에 지울겁니다.*/
    @PostMapping("update-images")
    public SingleResult<List<String>> registerImages(@RequestParam ("images")List<MultipartFile> images) throws IOException {
        List<String> imageUrlList = s3Service.uploadFiles(images,"test");
        log.info("imageUrlList: {}", imageUrlList);
        return responseService.getSingleResult(imageUrlList);
    }

    @PostMapping("business-license")
    public Result validateBusinessLicense(@RequestBody BusinessValidationRequestDto dto) throws UnsupportedEncodingException, URISyntaxException {
        if (!validationService.isValidBusinessLicense(dto)) {
            return responseService.getFailureResult(205, "사업자 등록번호가 유효하지 않습니다.");
        }
        return responseService.getSuccessResult();
    }

}
