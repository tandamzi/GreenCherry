package com.tandamzi.storeservice.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Cherrybox extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
//    @OneToOne(mappedBy = "cherryBox", fetch = FetchType.LAZY)
//    private Store store;

    private int quantity;
    private int totalPriceBeforeDiscount;
    private double discountRate;
    private String description;
    private int pricePerCherryBox;
}
