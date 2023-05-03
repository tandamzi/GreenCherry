package com.tandamzi.memberservice.domain;

import lombok.*;

import javax.persistence.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Builder
public class Notice extends BaseEntity{

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 2024)
    private String endPoint;

    @Column(length = 2024)
    private String p256dh;

    @Column(length = 2024)
    private String auth;
}
