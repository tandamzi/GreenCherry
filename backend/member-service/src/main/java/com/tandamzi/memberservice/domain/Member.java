package com.tandamzi.memberservice.domain;

import com.tandamzi.memberservice.common.config.security.oauth2.userinfo.AuthProvider;
import lombok.*;

import javax.persistence.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Builder
public class Member extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Long id;

    private String email;

    private String nickname;

    private int cherryPoint;

    @Column(length = 1024)
    private String image;

    private boolean alarm;

    @Enumerated(EnumType.STRING)
    private Role role;

    @Enumerated(EnumType.STRING)
    private AuthProvider provider;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "notice_id")
    private Notice notice;

    public void changeNickname(String nickname){
        this.nickname = nickname;
    }

    public void changeAlarm(){
        this.alarm = !this.alarm;
    }

    public void increaseCherryPoint(int point){
        this.cherryPoint += point;
    }

    public void changeImage(String imageUrl){
        this.image = imageUrl;
    }

    public void permitNotice(Notice notice){
        this.notice = notice;
    }
}
