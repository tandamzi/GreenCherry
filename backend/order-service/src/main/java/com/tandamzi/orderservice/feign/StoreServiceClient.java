package com.tandamzi.orderservice.feign;

import com.tandamzi.orderservice.common.result.Result;
import com.tandamzi.orderservice.common.result.SingleResult;
import com.tandamzi.orderservice.dto.StoreInfoForOrderDto;
import com.tandamzi.orderservice.dto.request.RegisterOrderDto;
import com.tandamzi.orderservice.dto.response.StoreDetailResponseDto;
import com.tandamzi.orderservice.dto.response.StoreDetailforOrderResponseDto;
import com.tandamzi.orderservice.feign.dto.StoreNameDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@FeignClient(name = "store-service")
public interface StoreServiceClient {

    @GetMapping("/store/{store-id}")
    SingleResult<StoreDetailResponseDto> searchStoreDetail(@PathVariable("store-id") Long storeId);

    @PutMapping("/store/{store-id}/cherrybox-quantity")
    Result decreaseCherryBox(@PathVariable("store-id") Long storeId, @RequestBody int orderQuantity);

    @PostMapping("/store/for-order")
    SingleResult<StoreDetailforOrderResponseDto> storeDetailforOrder(@RequestBody RegisterOrderDto orderDto);

    @GetMapping("/store/storeInfo-for-order")
    SingleResult<List<StoreInfoForOrderDto>> storeInfoForOrder(@RequestParam("storeIds") List<Long> storeIds);

    @GetMapping("/store/storeName")
    SingleResult<List<StoreNameDto>> storeNameForProgressOrder(@RequestParam("storeIds") List<Long> storeIds);
}
