package com.tandamzi.orderservice.kafka;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tandamzi.orderservice.dto.NoticeDto;
import com.tandamzi.orderservice.dto.OrderStatusDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class KafkaProducer {
    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;

    public void send(String topic, OrderStatusDto stautsDto){
        log.info("kafka Prdoducer send OrderStatusDto : " + stautsDto);
//        memberId, totalSalesAmount
        ObjectMapper mapper = new ObjectMapper();
        String jsonInString = "";

        try{
            jsonInString = mapper.writeValueAsString(stautsDto);
        }catch(JsonProcessingException e){
            e.printStackTrace();
        }

        kafkaTemplate.send(topic,jsonInString);
    }

    public void send(String topic, NoticeDto noticeDto){
        log.info("kafka Producer send -> Notice Dto : {}", noticeDto);

        ObjectMapper mapper = new ObjectMapper();
        String jsonInString = "";

        try{
            jsonInString = mapper.writeValueAsString(noticeDto);
        }catch(JsonProcessingException e){
            e.printStackTrace();
        }

        kafkaTemplate.send(topic,jsonInString);
    }

}
