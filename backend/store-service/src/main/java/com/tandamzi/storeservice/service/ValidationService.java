package com.tandamzi.storeservice.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tandamzi.storeservice.dto.request.BusinessValidationRequestDto;
import com.tandamzi.storeservice.dto.response.BusinessValidationResponseDto;
import com.tandamzi.storeservice.dto.response.PermissionValidationApiResponseDto;
import com.tandamzi.storeservice.dto.response.PermissionValidationResponseDto;
import com.tandamzi.storeservice.exception.BusinessLicenseNotValidException;
import com.tandamzi.storeservice.exception.BusinessPermissionNotValidException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class ValidationService {
    @Value("${public-api.business.url}")
    private String businessUrl;
    @Value(("${public-api.permission.url}"))
    private String permissionUrl;

    public boolean isValidBusinessLicense(BusinessValidationRequestDto requestDto) throws URISyntaxException {
        URI uri = new URI(businessUrl);
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = createJsonHeaders();
        List<BusinessValidationRequestDto> businesses = new ArrayList<>();
        businesses.add(requestDto);
        Map<String, List<BusinessValidationRequestDto>> map = Collections.singletonMap("businesses", businesses);
        HttpEntity<Map<String, List<BusinessValidationRequestDto>>> entity = new HttpEntity<>(map, headers);
        ResponseEntity<Map> resultMap = restTemplate.exchange(uri, HttpMethod.POST, entity, Map.class);
        ObjectMapper objectMapper = new ObjectMapper();
        BusinessValidationResponseDto responseDto = objectMapper.convertValue(resultMap.getBody(), BusinessValidationResponseDto.class);
        String valid = responseDto.getData().get(0).getValid();

        if (valid.equals("02")) {
            throw new BusinessLicenseNotValidException();
        }
        return true;
    }


    public PermissionValidationApiResponseDto isValidBusinessPermission(String businessLicenseNumber) {
        UriComponents uriComponent = UriComponentsBuilder
                .fromHttpUrl(permissionUrl)
                .path("/LCNS_NO=")
                .path(businessLicenseNumber)
                .build();
        RestTemplate restTemplate = new RestTemplate();
        ObjectMapper objectMapper = new ObjectMapper();
        ParameterizedTypeReference<Map<String, Object>> responseType = new ParameterizedTypeReference<Map<String, Object>>() {};
        ResponseEntity<Map<String, Object>> responseEntity = restTemplate.exchange(uriComponent.toUriString(), HttpMethod.GET, null, responseType);
        Map<String, Object> responseBodyMap = responseEntity.getBody();
        Map<String, Object> responseTotalData = (Map<String, Object>) responseBodyMap.get("I2500");
        List<Map<String, Object>> rows = (List<Map<String, Object>>) responseTotalData.get("row");
        String totalCount = (String) responseTotalData.get("total_count");
        if (!totalCount.equals("1")) {
            throw new BusinessPermissionNotValidException();
        }
        Map<String, Object> firstRow = rows.get(0);
        PermissionValidationApiResponseDto response = objectMapper.convertValue(firstRow, PermissionValidationApiResponseDto.class);
        return response;
    }

    private HttpHeaders createJsonHeaders() {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        return headers;
    }
}
