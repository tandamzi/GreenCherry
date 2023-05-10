package com.tandamzi.storeservice.communication.kafka;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tandamzi.storeservice.domain.Store;
import com.tandamzi.storeservice.exception.StoreNotFoundException;
import com.tandamzi.storeservice.repository.StoreRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class KafkaConsumer {

    private final StoreRepository storeRepository;

    @KafkaListener(topics = "increase-store-cherry-point")
    public void increaseCherryPoint(String kafkaMessage){
        log.info("KafkaConsumer topics = increase-store-cherry-point, kafkaMessage = {}", kafkaMessage);

        Map<Object, Object> map = new HashMap<>();
        ObjectMapper mapper = new ObjectMapper();

        try{
            map = mapper.readValue(kafkaMessage, new TypeReference<Map<Object, Object>>() {});
        } catch (JsonProcessingException e){
            e.printStackTrace();
        }

        Long storeId = Long.valueOf((Integer)( map.get("storeId")));
        int point = (int) map.get("cherryPoint");

        Store store = storeRepository.findById(storeId).orElseThrow(StoreNotFoundException::new);
        store.increaseCherryPoint(point);

    }
}
