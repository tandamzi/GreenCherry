package com.tandamzi.storeservice.communication.kafka;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tandamzi.storeservice.dto.kafka.CherryBoxNotificationDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@Slf4j
public class KafkaProducer {

    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;

    public void send(String topic, CherryBoxNotificationDto cherryBoxNotificationDto) {
        log.info("kafka Producer send endPointList : " + cherryBoxNotificationDto);
        ObjectMapper mapper = new ObjectMapper();
        String jsonData = "";
        try {
            jsonData = mapper.writeValueAsString(cherryBoxNotificationDto);
        } catch (JsonProcessingException e) {
            log.error("JSON으로 직렬화 하는 도중 에러 발생", e);
        }
        kafkaTemplate.send(topic, jsonData);
    }
}
