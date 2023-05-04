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
    @Column(name = "notice_id")
    private Long id;

    @Column(length = 2024)
    private String endPoint;

    @Column(length = 2024)
    private String p256dh;

    @Column(length = 2024)
    private String auth;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    public void change(String endPoint, String p256dh, String auth){
        this.endPoint = endPoint;
        this.p256dh = p256dh;
        this.auth = auth;
    }
}
