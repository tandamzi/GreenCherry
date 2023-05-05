package com.tandamzi.noticeservice;

import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.WebpushConfig;
import com.google.firebase.messaging.WebpushNotification;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NoticeService {

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
}
