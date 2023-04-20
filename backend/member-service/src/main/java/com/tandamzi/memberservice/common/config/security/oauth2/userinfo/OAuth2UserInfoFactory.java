package com.tandamzi.memberservice.common.config.security.oauth2.userinfo;

import lombok.extern.slf4j.Slf4j;

import java.util.Map;

@Slf4j
public class OAuth2UserInfoFactory {

    public static OAuth2UserInfo getOAuth2UserInfo(String registrationId, Map<String, Object> attributes) {
        log.info("registrationId: {}",registrationId);
        log.info("attributes: {}",attributes.toString());
        if(registrationId.equalsIgnoreCase(AuthProvider.google.toString())) {
            return new GoogleOAuth2UserInfo(attributes);
        } else if(registrationId.equalsIgnoreCase(AuthProvider.kakao.toString())){
            return new KakaoOAuth2UserInfo(attributes);
        }
        else return null; //exception 처리하는법 듣고 바꾸기
        /*else {
            throw new OAuth2AuthenticationProcessingException("소셜로그인: " + registrationId + "에 해당하는 플랫폼은 아직 지원하지 않습니다!");
        }*/
    }
}
