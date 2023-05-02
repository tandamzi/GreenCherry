package com.tandamzi.orderservice.repository;

import com.tandamzi.orderservice.domain.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface OrderRepositoryCustom {
    Page<Order> findOrderListByStoreIdAndMemberId(Long storeId,List<Long> memberId, Pageable pageable);
}
