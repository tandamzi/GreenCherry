package com.tandamzi.orderservice.kafka;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
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

    public OrderStatusDto send(String topic, OrderStatusDto stautsDto){
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

        return stautsDto;
    }

}
