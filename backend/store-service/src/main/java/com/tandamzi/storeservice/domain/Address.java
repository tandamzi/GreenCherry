package com.tandamzi.storeservice.domain;

import lombok.*;

import javax.persistence.Embeddable;
import javax.persistence.Entity;

@Embeddable
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Builder
public class Address {
    private String addressName;
    private String detailAddressName;
    private double lat;
    private double lng;
}
