package com.tandamzi.orderservice.repository;

import com.tandamzi.orderservice.domain.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends JpaRepository<Order ,Long> {

}
