package com.tandamzi.orderservice.feign;

import com.tandamzi.orderservice.common.result.Result;
import com.tandamzi.orderservice.common.result.SingleResult;
import com.tandamzi.orderservice.dto.response.StoreDetailResponseDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@FeignClient(name = "store-service")
public interface OrderServiceClient {

    @GetMapping("/store/{store-id}")
    SingleResult<StoreDetailResponseDto> searchStoreDetail(@PathVariable("store-id") Long storeId);

    @PutMapping("/store/{store-id}/cherryboxQuantity")
    Result decreaseCherrybox(@PathVariable("store-id") Long storeId, @RequestBody int orderQuantity);

}
