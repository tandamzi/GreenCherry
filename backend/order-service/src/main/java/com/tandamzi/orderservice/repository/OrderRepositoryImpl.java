package com.tandamzi.orderservice.repository;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.tandamzi.orderservice.domain.Order;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import javax.persistence.EntityManager;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import static com.tandamzi.orderservice.domain.QOrder.*;

@Slf4j
public class OrderRepositoryImpl implements OrderRepositoryCustom {

    private final EntityManager em;
    private final JPAQueryFactory queryFactory;

    public OrderRepositoryImpl(EntityManager em) {
        this.em = em;
        this.queryFactory = new JPAQueryFactory(this.em);
    }

    @Override
    public Page<Order> findOrderListByStoreIdAndMemberId(Long storeId, List<Long> memberId, String date, Pageable pageable) {
        List<Order> orders = queryFactory.selectFrom(order)
                .where(
                        order.storeId.eq(storeId),
                        memberIdIn(memberId),
                        orderDateIn(date)
                )
                .orderBy(order.createDate.desc())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        Long count = queryFactory.select(order.count())
                .from(order)
                .where(
                        order.storeId.eq(storeId),
                        memberIdIn(memberId),
                        orderDateIn(date)
                )
                .fetchOne();

        return new PageImpl<>(orders,pageable,count);
    }

    private BooleanExpression memberIdIn(List<Long> memberId){
        return memberId != null ? order.memberId.in(memberId) : null;
    }

    private BooleanExpression orderDateIn(String date){
        if(date == null) return null;

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDateTime startDateTime = LocalDate.parse(date, formatter).atStartOfDay();
        LocalDateTime endDateTime = LocalDate.parse(date, formatter).atStartOfDay().plusWeeks(1);

        return order.createDate.between(startDateTime, endDateTime);
    }
}
