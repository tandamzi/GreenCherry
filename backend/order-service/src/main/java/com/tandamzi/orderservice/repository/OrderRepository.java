package com.tandamzi.orderservice.repository;

import com.tandamzi.orderservice.domain.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order ,Long> , OrderRepositoryCustom{
    List<Order> findByMemberId(Long memberId);
}
