package com.tandamzi.memberservice.common.config.security.oauth2.userinfo;

import java.util.Map;

public class KakaoOAuth2UserInfo extends OAuth2UserInfo{
    Map<String, Object> kakaoAccount;
    Map<String, Object> profile;
    public KakaoOAuth2UserInfo(Map<String, Object> attributes) {
        super(attributes);
        kakaoAccount = (Map<String, Object>) attributes.get("kakao_account");
        profile = (Map<String, Object>) kakaoAccount.get("profile");
    }

    //kakao는 provider id따로 없으니
    @Override
    public String getId() {
        return String.valueOf(attributes.get("id"));
    }

    @Override
    public String getName() {
        return (String) profile.get("nickname");
    }

    @Override
    public String getEmail() {
        return (String) kakaoAccount.get("email");
    }

    @Override
    public String getImageUrl() {
        return (String) profile.get("thumbnail_image_url");
    }
}
