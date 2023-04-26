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

    private String image;

    private boolean alarm;

    @Enumerated(EnumType.STRING)
    private Role role;

    @Enumerated(EnumType.STRING)
    private AuthProvider provider;

    public void changeNickname(String nickname){
        this.nickname = nickname;
    }

    public void changeAlarm(){
        this.alarm = !this.alarm;
    }
}
