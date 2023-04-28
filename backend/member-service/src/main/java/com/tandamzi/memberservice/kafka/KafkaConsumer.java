package com.tandamzi.memberservice.kafka;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tandamzi.memberservice.domain.Member;
import com.tandamzi.memberservice.exception.member.MemberNotFoundException;
import com.tandamzi.memberservice.repository.MemberRepository;
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

    private final MemberRepository memberRepository;

    @KafkaListener(topics = "increase-cherry-point")
    public void increaseCherryPoint(String kafkaMessage){
        log.info("KafkaConsumer topics = increase-cherry-point, kafkaMessage = {}", kafkaMessage);

        Map<Object, Object> map = new HashMap<>();
        ObjectMapper mapper = new ObjectMapper();

        try{
            map = mapper.readValue(kafkaMessage, new TypeReference<Map<Object, Object>>() {});
        } catch (JsonProcessingException e){
            e.printStackTrace();
        }

        Long memberId = (Long) map.get("memberId");
        int point = (int) map.get("point");

        Member member = memberRepository.findById(memberId).orElseThrow(MemberNotFoundException::new);
        member.increaseCherryPoint(point);
    }
}
