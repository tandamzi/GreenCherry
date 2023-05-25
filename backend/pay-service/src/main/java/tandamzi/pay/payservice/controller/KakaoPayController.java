package tandamzi.pay.payservice.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tandamzi.pay.payservice.common.response.ResponseService;
import tandamzi.pay.payservice.common.result.Result;
import tandamzi.pay.payservice.dto.response.KakaoCancelResponse;
import tandamzi.pay.payservice.dto.response.KakaoReadyResponse;
import tandamzi.pay.payservice.dto.request.KakaoPayRequestDto;
import tandamzi.pay.payservice.service.KakaoPayService;

@RestController
@RequestMapping("/pay")
@RequiredArgsConstructor
@Slf4j
public class KakaoPayController {

    private final ResponseService responseService;
    private final KakaoPayService kakaoPayService;

    /**
     * 결제요청
     */
    @PostMapping("/ready")
    public KakaoReadyResponse readyToKakaoPay(@RequestBody KakaoPayRequestDto kakaoPayRequestDto) {
        log.info("kakaoPayRequestDto : {}", kakaoPayRequestDto);
        return kakaoPayService.requestKakaoPay(kakaoPayRequestDto);
    }

    /**
     * 가상 결제 성공
     */
    @GetMapping("/success")
    public Result successPay(@RequestParam("pg-token") String pgToken, @RequestParam("partner-order-id") String partnerOrderId) {
        log.info("[controller] /success afterPayRequest ");
        log.info("pg_token : {}", pgToken);
        log.info("partnerOrderId : {}", partnerOrderId);

        kakaoPayService.approveTestResponse(partnerOrderId, pgToken);
        return responseService.getSuccessResult();
    }



    /**
     * 결제 진행 중 취소
     */
    @GetMapping("/cancel")
    public HttpEntity<String> cancel() {
        log.info("[controller] /cancel cancel");
        return new ResponseEntity<>("cancel됐습니다", HttpStatus.OK);
//        throw new BusinessLogicException(ExceptionCode.PAY_CANCEL);
    }

    /**
     * 결제 실패
     */
    @GetMapping("/fail")
    public void fail() {
        throw new InternalError("결제 실패");

//        throw new BusinessLogicException(ExceptionCode.PAY_FAILED);
    }

    /**
     * 환불
     */
    @PostMapping("/refund")
    public ResponseEntity refund() {

        KakaoCancelResponse kakaoCancelResponse = kakaoPayService.kakaoCancel();

        return new ResponseEntity<>(kakaoCancelResponse, HttpStatus.OK);
    }

    //    /**
//     * 실제 결제 성공
//     */
//    @GetMapping("success")
//    public ResponseEntity afterPayRequest(@RequestParam("pg_token") String pgToken,@RequestParam("partner_order_id") String partnerOrderId) {
//        log.info("[controller] /success afterPayRequest ");
//        log.info("pg_token : {}", pgToken);
//        log.info("partnerOrderId : {}", partnerOrderId);
//
//        KakaoApproveResponse kakaoApprove = kakaoPayService.approveResponse(partnerOrderId,pgToken);
//
//        return new ResponseEntity<>(kakaoApprove, HttpStatus.OK);
//    }
}