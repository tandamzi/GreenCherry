package com.tandamzi.orderservice.service;

import com.tandamzi.orderservice.domain.Order;
import com.tandamzi.orderservice.dto.request.RegisterOrderDto;
import com.tandamzi.orderservice.repository.OrderRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest
class OrderServiceTest {
    @Autowired
    private OrderService orderService;

    @Autowired
    private OrderRepository orderRepository;

    @Test
    void registerOrder_동시요청() throws InterruptedException {
        int threadCount = 100;
        ExecutorService executorService = Executors.newFixedThreadPool(32);
        CountDownLatch latch = new CountDownLatch(threadCount);

        for(int i=0;i<threadCount;i++){
            executorService.submit(()->{
                try{
                    RegisterOrderDto build = RegisterOrderDto.builder()
                            .storeId(1L)
                            .memberId(3L)
                            .orderQuantity(1)
                            .build();
                    orderService.registerOrder(build);
                }finally {
                    latch.countDown();
                }
            });
        }
        latch.await();
        List<Order> byMemberId = orderRepository.findByMemberId(3L);

        assertEquals(100,byMemberId.size());
    }
}