package com.tandamzi.storeservice.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tandamzi.storeservice.dto.request.BusinessValidationRequestDto;
import com.tandamzi.storeservice.dto.response.BusinessValidationResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.env.Environment;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class ValidationService {
    @Value("${public-api.business.url}")
    private String url;

    public boolean isValidBusinessLicense(BusinessValidationRequestDto requestDto) throws URISyntaxException {
        URI uri = new URI(url);
        log.info("url: {}", url);
        log.info("uri: {}", uri);

        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        List<BusinessValidationRequestDto> businesses = new ArrayList<>();
        businesses.add(requestDto);
        Map<String, List<BusinessValidationRequestDto>> map = Collections.singletonMap("businesses", businesses);
        HttpEntity<Map<String, List<BusinessValidationRequestDto>>> entity = new HttpEntity<>(map, headers);
        ResponseEntity<Map> resultMap = restTemplate.exchange(uri, HttpMethod.POST, entity, Map.class);
        ObjectMapper objectMapper = new ObjectMapper();
        BusinessValidationResponseDto responseDto = objectMapper.convertValue(resultMap.getBody(), BusinessValidationResponseDto.class);
        String valid = responseDto.getData().get(0).getValid();

        if (valid.equals("02")) {
            return false;
        }
        return true;
    }


}
