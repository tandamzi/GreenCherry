package com.tandamzi.memberservice.common.config.security.jwt;


import com.tandamzi.memberservice.domain.Member;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Map;

@Getter @Setter
public class UserDetail implements OAuth2User, UserDetails {
    private Long id;
    private String email;

    private Collection<? extends GrantedAuthority> authorities;
    private Map<String, Object> attributes;

    public UserDetail(long id, String email, List<GrantedAuthority> authorities) {
        this.id = id;
        this.email = email;
        this.authorities = authorities;
    }

    public static UserDetail create(Member member, Map<String, Object> attributes) {
        UserDetail userDetail = UserDetail.create(member);
        userDetail.setAttributes(attributes);
        return userDetail;
    }

    public static UserDetail create(Member member) {
        List<GrantedAuthority> authorities = Collections.
                singletonList(new SimpleGrantedAuthority("ROLE_USER"));
        return new UserDetail(member.getId(), member.getEmail(), authorities);
    }


    @Override
    public <A> A getAttribute(String name) {
        return OAuth2User.super.getAttribute(name);
    }

    @Override
    public Map<String, Object> getAttributes() {
        return attributes;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return null;
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public String getName() {
        return String.valueOf(id);
    }
}
