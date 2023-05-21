package tandamzi.pay.payservice.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import tandamzi.pay.payservice.domain.Payment;
import tandamzi.pay.payservice.domain.Status;
import tandamzi.pay.payservice.dto.response.KakaoCancelResponse;
import tandamzi.pay.payservice.dto.response.KakaoReadyResponse;
import tandamzi.pay.payservice.dto.request.KakaoPayRequestDto;
import tandamzi.pay.payservice.repository.PaymentRepository;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class KakaoPayService {

    @Value("${kakao-payment.cid}")
    private String cid; // 가맹점 테스트 코드
    @Value("${kakao-payment.admin-key}")
    private String admin_Key;
    @Value("${kakao-payment.approve-url}")
    private String approveUrl;
    @Value("${kakao-payment.cancel-url}")
    private String cancelUrl;
    @Value("${kakao-payment.fail-url}")
    private String failUrl;
    @Value("${kakao-payment.ready-request-url}")
    private String requestUrl;
    @Value("${kakao-payment.approve-request-url}")
    private String approveRequestUrl;

    private final PaymentRepository paymentRepository;




    public KakaoReadyResponse requestKakaoPay(KakaoPayRequestDto kakaoPayRequestDto) {
        //cid,admin_Key,approveUrl,cancelUrl,failUrl,requestUrl,approveRequestUrl 로그찍어보기
        log.info("cid : {}", cid);
        log.info("admin_Key : {}", admin_Key);
        log.info("approveUrl : {}", approveUrl);
        log.info("cancelUrl : {}", cancelUrl);
        log.info("failUrl : {}", failUrl);
        log.info("requestUrl : {}", requestUrl);
        log.info("approveRequestUrl : {}", approveRequestUrl);
        log.info("[service] kakaoPayReady kakaoPayReady()");

        String uuid = java.util.UUID.randomUUID().toString();
        paymentRepository.save(Payment.builder()
                .memberId(kakaoPayRequestDto.getMemberId())
                .itemName(kakaoPayRequestDto.getItemName())
                .quantity(kakaoPayRequestDto.getQuantity())
                .totalAmount(kakaoPayRequestDto.getTotalAmount())
                .partnerOrderId(uuid)
                .status(Status.CREATED)
                .build());

        // 카카오페이 요청 양식
        MultiValueMap<String, String> parameters = new LinkedMultiValueMap<>();
        parameters.add("cid", cid);
        parameters.add("partner_order_id", uuid);
        parameters.add("partner_user_id", kakaoPayRequestDto.getMemberId().toString());
        parameters.add("item_name", kakaoPayRequestDto.getItemName());
        parameters.add("quantity", Integer.toString(kakaoPayRequestDto.getQuantity()));
        parameters.add("total_amount", Integer.toString(kakaoPayRequestDto.getTotalAmount()));
        parameters.add("vat_amount", Integer.toString(kakaoPayRequestDto.getVatAmount()));
        parameters.add("tax_free_amount", "0");
        parameters.add("approval_url", approveUrl+"?partner_order_id="+uuid);
        parameters.add("cancel_url", cancelUrl);
        parameters.add("fail_url", failUrl);

        HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(parameters, this.getHeaders());
        RestTemplate restTemplate = new RestTemplate();
        KakaoReadyResponse readyResponse = restTemplate.postForObject(requestUrl, requestEntity, KakaoReadyResponse.class);

        Payment payment = paymentRepository.findByPartnerOrderId(uuid).orElseThrow(() -> new IllegalArgumentException("결제 정보(partner-order-id)가 없습니다."));
        payment.saveTid(readyResponse.getTid());
        payment.changeStatus(Status.READY);

        log.info("[service] requestParameter : {}", parameters);
        log.info("[service] readyResponse : {}", readyResponse);
        return readyResponse;
    }

    /**
     * 결제 완료 승인
     * test결제는 pgToken으로 승인할 필요가 없으니 void
     */
    public void approveTestResponse(String partnerOrderId, String pgToken) {
        log.info("[service] KakaoApproveResponse approveResponse");
        Payment payment = paymentRepository.findByPartnerOrderId(partnerOrderId).orElseThrow(() -> new IllegalArgumentException("결제 정보(tid)가 없습니다."));
        payment.changeStatus(Status.PAID);
    }




    /**
     * 카카오 API 요청 Header
     */
    private HttpHeaders getHeaders() {
        log.info("[service] HttpHeaders getHeaders");
        HttpHeaders httpHeaders = new HttpHeaders();
        String auth = "KakaoAK " + admin_Key;
        httpHeaders.set("Authorization", auth);
        httpHeaders.set("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        return httpHeaders;
    }

    /**
     * 결제 환불
     */
    public KakaoCancelResponse kakaoCancel() {

        // 카카오페이 요청
        MultiValueMap<String, String> parameters = new LinkedMultiValueMap<>();
        parameters.add("cid", cid);
        parameters.add("tid", "환불할 결제 고유 번호");
        parameters.add("cancel_amount", "환불 금액");
        parameters.add("cancel_tax_free_amount", "환불 비과세 금액");
        parameters.add("cancel_vat_amount", "환불 부가세");

        // 파라미터, 헤더
        HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(parameters, this.getHeaders());

        // 외부에 보낼 url
        RestTemplate restTemplate = new RestTemplate();

        KakaoCancelResponse cancelResponse = restTemplate.postForObject(
                "https://kapi.kakao.com/v1/payment/cancel",
                requestEntity,
                KakaoCancelResponse.class);

        return cancelResponse;
    }

    //실제 결제
    /*public KakaoApproveResponse approveResponse(String tid, String pgToken) {
        log.info("[service] KakaoApproveResponse approveResponse");
        Payment payment = paymentRepository.findByTid(tid).orElseThrow(() -> new IllegalArgumentException("결제 정보(tid)가 없습니다."));

        KakaoApproveResponse approveResponse = new KakaoApproveResponse();
        approveResponse = getKakaoApproveResponse(pgToken, payment);
        payment.changeStatus(Status.PAID);

        return approveResponse;
    }*/

    /*private KakaoApproveResponse getKakaoApproveResponse(String pgToken, Payment payment) {
        // 카카오 요청
        MultiValueMap<String, String> parameters = new LinkedMultiValueMap<>();
        parameters.add("cid", cid);
        parameters.add("tid", payment.getTid());
        parameters.add("partner_order_id", payment.getPartnerOrderId());
        parameters.add("partner_user_id", String.valueOf(payment.getMemberId()));
        parameters.add("pg_token", pgToken);

        // 파라미터, 헤더
        HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(parameters, this.getHeaders());

        // 외부에 보낼 url
        RestTemplate restTemplate = new RestTemplate();
        KakaoApproveResponse approveResponse = restTemplate.postForObject(
                approveRequestUrl,
                requestEntity,
                KakaoApproveResponse.class);

        log.info("[service] approveResponse : {}", approveResponse);
        return approveResponse;
    }*/

}