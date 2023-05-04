package com.tandamzi.storeservice.domain;

import lombok.*;

import javax.persistence.Embeddable;
import javax.persistence.Entity;

@Embeddable
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Builder
@Entity
public class Address {
    private String addressName;
    private double lat;
    private double lng;
}
