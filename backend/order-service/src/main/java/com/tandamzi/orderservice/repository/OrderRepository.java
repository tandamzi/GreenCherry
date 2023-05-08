package com.tandamzi.orderservice.repository;

import com.tandamzi.orderservice.domain.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order ,Long> , OrderRepositoryCustom{
    List<Order> findByMemberId(Long memberId);
    Page<Order> findPageByMemberId(Long memberId, Pageable pageable);
    @Query("select o from Order o where o.id in :orderId")
    Page<Order> findListById(@Param("orderId") List<Long> orderId, Pageable pageable);
}
