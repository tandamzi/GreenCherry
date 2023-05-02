package com.tandamzi.orderservice.repository;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.tandamzi.orderservice.domain.Order;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import javax.persistence.EntityManager;

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
    public Page<Order> findOrderListByStoreIdAndMemberId(Long storeId, List<Long> memberId, Pageable pageable) {
        List<Order> orders = queryFactory.selectFrom(order)
                .where(
                        order.storeId.eq(storeId),
                        memberIdIn(memberId)
                )
                .orderBy(order.createDate.desc())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        Long count = queryFactory.select(order.count())
                .from(order)
                .where(
                        order.storeId.eq(storeId),
                        memberIdIn(memberId)
                )
                .fetchOne();

        return new PageImpl<>(orders,pageable,count);
    }
    private BooleanExpression memberIdIn(List<Long> memberId){
        return memberId != null ? order.memberId.in(memberId) : null;
    }
}
