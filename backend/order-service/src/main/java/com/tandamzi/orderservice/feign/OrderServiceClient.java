package com.tandamzi.orderservice.feign;

import com.tandamzi.orderservice.dto.response.StoreDetailResponseDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;

import java.util.List;

@FeignClient(name = "store-service")
public interface OrderServiceClient {

    @GetMapping("/store/{store-id}")
    StoreDetailResponseDto getStoreDetail(@PathVariable("store-id") Long storeId);

    @PutMapping("/store/{store-id}/cherrybox")
    void updateCherryBox(@PathVariable("store-id") Long storeId);

}
