package com.tandamzi.memberservice.common.config.security.oauth2;



import com.tandamzi.memberservice.common.config.security.jwt.UserDetail;
import com.tandamzi.memberservice.common.config.security.oauth2.userinfo.AuthProvider;
import com.tandamzi.memberservice.common.config.security.oauth2.userinfo.OAuth2UserInfo;
import com.tandamzi.memberservice.common.config.security.oauth2.userinfo.OAuth2UserInfoFactory;
import com.tandamzi.memberservice.domain.Member;
import com.tandamzi.memberservice.domain.Role;
import com.tandamzi.memberservice.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;
import java.util.Random;

@Service
@RequiredArgsConstructor
@Slf4j
public class CustomOAuth2UserService extends DefaultOAuth2UserService {
    private final MemberRepository memberRepository;
    private final static int RANDOM_STRING_SIZE = 10;
    private final static String[] DEAFULT_PROFILE_IMAGES = {
            "https://firebasestorage.googleapis.com/v0/b/sock-f6e94.appspot.com/o/profile%2Fdeafult_profile_image.jpeg?alt=media",
            "https://firebasestorage.googleapis.com/v0/b/sock-f6e94.appspot.com/o/profile%2Fprofile2.png?alt=media",
            "https://firebasestorage.googleapis.com/v0/b/sock-f6e94.appspot.com/o/profile%2Fprofile3.png?alt=media",
            "https://firebasestorage.googleapis.com/v0/b/sock-f6e94.appspot.com/o/profile%2Fprofile4.png?alt=media",
            "https://firebasestorage.googleapis.com/v0/b/sock-f6e94.appspot.com/o/profile%2Fprofile5.png?alt=media",
            "https://firebasestorage.googleapis.com/v0/b/sock-f6e94.appspot.com/o/profile%2Fprofile6.png?alt=media",
            "https://firebasestorage.googleapis.com/v0/b/sock-f6e94.appspot.com/o/profile%2Fprofile7.png?alt=media",
            "https://firebasestorage.googleapis.com/v0/b/sock-f6e94.appspot.com/o/profile%2Fprofile8.png?alt=media",
            "https://firebasestorage.googleapis.com/v0/b/sock-f6e94.appspot.com/o/profile%2Fprofile9.png?alt=media",
            "https://firebasestorage.googleapis.com/v0/b/sock-f6e94.appspot.com/o/profile%2Fprofile10.png?alt=media",
            "https://firebasestorage.googleapis.com/v0/b/sock-f6e94.appspot.com/o/profile%2Fprofile11.png?alt=media"
    };

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User user = super.loadUser(userRequest);
        try {
            return this.process(userRequest, user);
        } catch (Exception ex) {
            ex.printStackTrace();
            throw new InternalAuthenticationServiceException(ex.getMessage(), ex.getCause());
        }
    }

    private OAuth2User process(OAuth2UserRequest oAuth2UserRequest, OAuth2User oAuth2User) {
        AuthProvider authProvider = AuthProvider.valueOf(oAuth2UserRequest.getClientRegistration().getRegistrationId().toLowerCase());
        String registrationId = authProvider.toString();

        OAuth2UserInfo userInfo = OAuth2UserInfoFactory.getOAuth2UserInfo(registrationId, oAuth2User.getAttributes());
        Optional<Member> optionalMember = memberRepository.findByEmailAndProvider(userInfo.getEmail(),authProvider);
        Member user;

        if (optionalMember.isPresent()) {
            user = updateUser(optionalMember.get(), userInfo);
        } else {
            user = createUser(userInfo, authProvider);
        }

        return UserDetail.create(user, oAuth2User.getAttributes());
    }

    @Transactional
    Member createUser(OAuth2UserInfo userInfo, AuthProvider authProvider) {
        Random randomIntegerGenerator = new Random();
        int randomIndex = randomIntegerGenerator.nextInt(11);

        Member member = Member.builder()
                .email(userInfo.getEmail())
                .nickname(userInfo.getName())
                .image(DEAFULT_PROFILE_IMAGES[randomIndex])
                .provider(authProvider)
                .alarm(true)
                .role(Role.USER)
                .cherryPoint(0)
                .build();

        return memberRepository.save(member);
    }

    @Transactional
    Member updateUser(Member existingMember, OAuth2UserInfo userInfo) {
        return existingMember;
    }
}