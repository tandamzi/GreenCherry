package com.tandamzi.orderservice.feign.error;

import feign.Response;
import feign.codec.ErrorDecoder;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;
@Slf4j
public class FeignErrorDecoder implements ErrorDecoder {
    @Override
    public Exception decode(String methodKey, Response response) {
        switch (response.status()){
            case 404:
                if(methodKey.contains("storeDetailforOrder")){
                    log.info("response = {}",response);
                    log.info("response.body() ={}",response.body());
                    return new ResponseStatusException(HttpStatus.valueOf(response.status()),
                            "store-service error");
                }
                break;
            default:
                return new Exception(response.reason());
        }
        return null;
    }
}
