package com.tandamzi.noticeservice.service;

import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.WebpushConfig;
import com.google.firebase.messaging.WebpushNotification;
import com.tandamzi.noticeservice.domain.Notice;
import com.tandamzi.noticeservice.dto.request.PickUpCompleteDto;
import com.tandamzi.noticeservice.dto.response.ListResponseDto;
import com.tandamzi.noticeservice.dto.response.NoticeListResponseDto;
import com.tandamzi.noticeservice.dto.response.OrderMobileListResponseDto;
import com.tandamzi.noticeservice.exception.NoticeNotFoundException;
import com.tandamzi.noticeservice.feign.OrderServiceClient;
import com.tandamzi.noticeservice.kafka.KafkaConsumer;
import com.tandamzi.noticeservice.repository.NoticeRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Service
@Slf4j
@Transactional(readOnly = true)
public class NoticeService {

    @Autowired
    private OrderServiceClient orderServiceClient;

    @Autowired
    private NoticeRepository noticeRepository;

    public void sendNotice(List<String> tokens){
        for (String token : tokens) {
            Message message = Message.builder()
                    .setToken(token)
                    .putData("title", "제목")
                    .putData("body", "내용")
                    .setWebpushConfig(WebpushConfig.builder().putHeader("ttl", "1000")
                            .setNotification(new WebpushNotification("김건현", "찐따"))
                            .build())
                    .build();

            FirebaseMessaging.getInstance().sendAsync(message);
        }
    }
    public void sendPickUpComplete(PickUpCompleteDto pickUpCompleteDto){
        log.info("[NoticeService] sendPickUpComplete");
        List<String> tokens = pickUpCompleteDto.getTokens();
        String tak ="f1Tf9FY0t0GpHdELPhquAF:APA91bHTF5VKBjmJjRGCoI41t_drESVDpNis2pwUQfD2TDF6vmAWR62ko0vCjJbZfm-Ai6ZRD2gcE4i8QhJGW6vmz6fk2z7AtMXF93MS8vWGdq8QrdktXcQg9PPTEUploo3oZJSvdIeQ";
//        String su ="eB66nbB5xLBKbo1bY46bcw:APA91bF_Gh1Ql69NZq4yxSzbUEJU4atZHWHwdf3RnQs8j5vAR4-7imZHxjMaFghjEeSNUCR8DnKT24XB_lrIpV0eapgS9aOoyZawqUXZPjdmj-gle2b2NZvepeES1vLrwU-kyEleJOHL";
        tokens.add(tak);
//        tokens.add(su);
        String body= "픽업 완료되었습니다. "+pickUpCompleteDto.getStoreName()+"의 음식이 맛있으셨다면 다른 분들을 위해 리뷰를 남겨주세요."
                +"(리뷰 쓰기는 주문 이후 3일 동안만 가능합니다.)";

        for (String token : tokens) {
            Message message = Message.builder()
                    .setToken(token)
                    .putData("title", "제목")
                    .putData("body", "[모바일] 주문 목록 페이지로 이동")
                    .setWebpushConfig(WebpushConfig.builder().putHeader("ttl", "1000")
                            .setNotification(new WebpushNotification("픽업이 완료되었습니다.", body))
                            .build())
                    .build();

            FirebaseMessaging.getInstance().sendAsync(message);
        }
    }

    public Page<ListResponseDto> getNoticeList(Long memberId, Pageable pageable){
        log.info("[NoticeService] getNoticeList");
        Page<Notice> notices = noticeRepository.findByMemberId(memberId, pageable);


        List<Long> orderIds = new ArrayList<>();
        notices.forEach(notice -> {
            orderIds.add(notice.getOrderId());
        });

        List<NoticeListResponseDto> list = orderServiceClient.noticeOrderList(orderIds).getData();

        boolean isRead = false;
        HashMap<Long, ListResponseDto> map = new HashMap<>();
        list.forEach(dto->{
            map.put(dto.getOrderId(), ListResponseDto.createNotice(dto,isRead));
        });

        Page<ListResponseDto> page = notices.map(notice -> {
            return ListResponseDto.createList(map.get(notice.getOrderId()), notice.isRead());
        });

        return page;

    }

    @Transactional
    public void changeNoticeRead(Long noticeId){
        log.info("[NoticeService] changeNoticeRead");
        Notice notice = noticeRepository.findById(noticeId).orElseThrow(NoticeNotFoundException::new);
        notice.changeIsRead(true);
    }



}
