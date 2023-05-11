package com.tandamzi.noticeservice.service;

import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.WebpushConfig;
import com.google.firebase.messaging.WebpushNotification;
import com.tandamzi.noticeservice.domain.Notice;
import com.tandamzi.noticeservice.dto.request.PickUpCompleteDto;
import com.tandamzi.noticeservice.dto.request.RegisterCherryBoxDto;
import com.tandamzi.noticeservice.dto.request.RegisterOrderDto;
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

        String body= "픽업 완료되었습니다. "+pickUpCompleteDto.getStoreName()+"의 음식이 맛있으셨다면 다른 분들을 위해 리뷰를 남겨주세요."
                +"(리뷰 쓰기는 주문 이후 3일 동안만 가능합니다.)";

        for (String token : tokens) {
            Message message = Message.builder()
                    .setToken(token)
                    .putData("noticeType", "3")
                    .putData("storeId", String.valueOf(pickUpCompleteDto.getStoreId()))
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

    public void sendNoticeForRegisterOrder(RegisterOrderDto registerOrderDto){
        log.info("[NoticeService] sendNoticeForRegisterOrder");
        List<String> tokens = registerOrderDto.getTokens();

        String body = "체리박스 " + registerOrderDto.getQuantity() + "개 주문이 들어왔습니다.\n"
                + registerOrderDto.getTotalSalesAmount() + "원";

        for (String token : tokens) {
            Message message = Message.builder()
                    .setToken(token)
                    .putData("noticeType", String.valueOf(registerOrderDto.getNoticeType()))
                    .putData("storeId", String.valueOf(registerOrderDto.getStoreId()))
                    .setWebpushConfig(WebpushConfig.builder().putHeader("ttl", "1000")
                            .setNotification(new WebpushNotification("주문이 들어왔습니다.", body))
                            .build())
                    .build();

            FirebaseMessaging.getInstance().sendAsync(message);
        }
    }
    public void sendNoticeToSubscribers(RegisterCherryBoxDto registerCherryBoxDto) {
        List<String> tokens = registerCherryBoxDto.getTokens();
        StringBuilder sb = new StringBuilder();
        sb.append(registerCherryBoxDto.getStoreName());
        sb.append("에서 체리박스가 등록되었습니다. 체리박스를 확인해보세요!");
        String body = sb.toString();

        for(String token : tokens){
            Message message = Message.builder()
                    .setToken(token)
                    .putData("noticeType", String.valueOf(registerCherryBoxDto.getNoticeType()))
                    .putData("storeId", String.valueOf(registerCherryBoxDto.getStoreId()))
                    .setWebpushConfig(WebpushConfig.builder().putHeader("ttl", "1000")
                            .setNotification(new WebpushNotification("구독한 가게에서 체리박스가 등록됐어요!", body))
                            .build())
                    .build();
            FirebaseMessaging.getInstance().sendAsync(message);
        }
    }


}
