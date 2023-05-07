package com.tandamzi.noticeservice.common;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.io.InputStream;

@Slf4j
@Component
public class NoticeInitializer {

    @Value("${firebase.path}")
    private String path;

    @PostConstruct
    public void init(){
        ClassPathResource resource = new ClassPathResource(path);

        try(InputStream is = resource.getInputStream()) {
            FirebaseOptions options = FirebaseOptions.builder()
                    .setCredentials(GoogleCredentials.fromStream(is))
                    .build();

            if(FirebaseApp.getApps().isEmpty()){
                FirebaseApp.initializeApp(options);
                log.info("Firebase application init");
            }
        } catch (IOException e) {
            e.printStackTrace();
            log.error(e.getMessage());
        }
    }
}
