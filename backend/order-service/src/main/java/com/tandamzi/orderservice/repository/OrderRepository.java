package com.tandamzi.orderservice.repository;

import com.tandamzi.orderservice.domain.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.persistence.Tuple;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order ,Long> , OrderRepositoryCustom {
    List<Order> findByMemberId(Long memberId);

    Page<Order> findPageByMemberId(Long memberId, Pageable pageable);

    @Query("select o from Order o where o.id in :orderId")
    List<Order> findListById(@Param("orderId") List<Long> orderId);

    @Query("select count(*) as count ,sum (o.totalSalesAmount) as totalAmount from Order o " +
            "where o.storeId = :storeId and o.createDate between :startDateTime and :endDateTime")
    Object[] findByStoreIdAndCreateDate(@Param("storeId")Long storeId, @Param("startDateTime")LocalDateTime startDateTime ,@Param("endDateTime")LocalDateTime endDateTime);

    @Query("select count(*) as count ,sum (o.totalSalesAmount) as totalAmount from Order o " +
            "where o.storeId = :storeId and o.createDate between :startDateTime and :endDateTime")
    Tuple findTupleByStoreIdAndCreateDate(@Param("storeId")Long storeId, @Param("startDateTime")LocalDateTime startDateTime , @Param("endDateTime")LocalDateTime endDateTime);

}
