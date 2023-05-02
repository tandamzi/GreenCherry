package com.tandamzi.orderservice.feign;

import com.tandamzi.orderservice.common.result.Result;
import com.tandamzi.orderservice.common.result.SingleResult;
import com.tandamzi.orderservice.dto.response.StoreDetailResponseDto;
import com.tandamzi.orderservice.dto.response.StoreDetailforOrderResponseDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "store-service")
public interface StoreServiceClient {

    @GetMapping("/store/{store-id}")
    SingleResult<StoreDetailResponseDto> searchStoreDetail(@PathVariable("store-id") Long storeId);

    @PutMapping("/store/{store-id}/cherrybox-quantity")
    Result decreaseCherryBox(@PathVariable("store-id") Long storeId, @RequestBody int orderQuantity);

    @GetMapping("/store/{store-id}/for-order")
    SingleResult<StoreDetailforOrderResponseDto> storeDetailforOrder(@PathVariable("store-id") Long storeId);

}
