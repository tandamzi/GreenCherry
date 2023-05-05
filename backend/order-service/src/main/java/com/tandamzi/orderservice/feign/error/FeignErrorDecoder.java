package com.tandamzi.orderservice.feign.error;

import com.tandamzi.orderservice.exception.CherryBoxQuantityInsufficientException;
import com.tandamzi.orderservice.exception.StoreNotOpenException;
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
                    return new StoreNotOpenException();
                }
                break;
            case 406:
                if(methodKey.contains("storeDetailforOrder")){
                    return new CherryBoxQuantityInsufficientException();
                }
            default:
                return new Exception(response.reason());
        }
        return null;
    }
}
