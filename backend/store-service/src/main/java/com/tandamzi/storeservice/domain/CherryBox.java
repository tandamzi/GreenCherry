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
public class CherryBox extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private int quantity;
    private int totalPriceBeforeDiscount;
    private double discountRate;
    private String description;
    private int pricePerCherryBox;

    public void updateCherryBox(int quantity, int totalPriceBeforeDiscount, double discountRate, String description, int pricePerCherryBox){
        this.quantity = quantity;
        this.totalPriceBeforeDiscount = totalPriceBeforeDiscount;
        this.discountRate = discountRate;
        this.description = description;
        this.pricePerCherryBox = pricePerCherryBox;
    }
}
