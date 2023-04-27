package com.tandamzi.memberservice.common.config.login;

import com.tandamzi.memberservice.common.annotation.LoginMember;
import lombok.RequiredArgsConstructor;
import org.springframework.core.MethodParameter;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

import javax.servlet.http.HttpServletRequest;

@Component
@RequiredArgsConstructor
public class LoginMemberArgumentResolver implements HandlerMethodArgumentResolver {

    private final LoginService loginService;
    private final HttpServletRequest request;

    @Override
    public boolean supportsParameter(MethodParameter parameter) {
        return (parameter.getParameterAnnotation(LoginMember.class) != null);
    }

    @Override
    public Object resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer, NativeWebRequest webRequest, WebDataBinderFactory binderFactory) throws Exception {
        return loginService.getLoginMember(request);
    }
}
