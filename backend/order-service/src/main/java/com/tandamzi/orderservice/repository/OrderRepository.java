package com.tandamzi.orderservice.repository;

import com.tandamzi.orderservice.domain.Order;
import com.tandamzi.orderservice.dto.jpa.OrderDateDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order ,Long> , OrderRepositoryCustom {
    List<Order> findByMemberId(Long memberId);

    Page<Order> findPageByMemberId(Long memberId, Pageable pageable);

    @Query("select o from Order o where o.id in :orderId")
    List<Order> findListById(@Param("orderId") List<Long> orderId);

    @Query(value ="select new com.tandamzi.orderservice.dto.jpa.OrderDateDto(count(*),sum (Order.totalSalesAmount)) from Order " +
            "where date_format(o.createDate,'%Y-%m-%d') = :orderDate and Order.storeId = :storeId ",nativeQuery = true)
    Optional<OrderDateDto> findByStoreIdAndCreateDate(@Param("storeId")Long storeId, @Param("orderDate")LocalDate orderDate);

//    @Query(value = "select new com.ta" +
//            "count(*) , sum (Order.totalSalesAmount) from Order o where date_format(o.createDate,'%Y-%m-%d') = :orderDate " +
//            " and o.storeId = :storeId",nativeQuery = true)
//    Optional<OrderDateDto> findCountByStoreIdAndCreateDate(@Param("storeId")Long storeId, @Param("orderDate")LocalDate orderDate);


}
