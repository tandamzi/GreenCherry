package com.tandamzi.memberservice.domain;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Role {

    USER("ROLE_USER"),
    OWNER("ROLE_OWNER"),
    ADMIN("ROLE_ADMIN");

    private final String key;
}
