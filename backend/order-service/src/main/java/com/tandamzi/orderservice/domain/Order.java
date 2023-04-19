package com.tandamzi.orderservice.domain;

import lombok.*;

import javax.persistence.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Builder
@Table(name = "orders")
public class Order extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "orders_id")
    private Long id;

    private Long userId;

    private Long storeId;

    @Enumerated(EnumType.STRING)
    private State state;

    private int quantity;

    private int totalSalesAmount;

}