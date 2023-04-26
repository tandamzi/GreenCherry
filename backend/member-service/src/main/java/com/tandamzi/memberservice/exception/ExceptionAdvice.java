package com.tandamzi.memberservice.exception;

import com.tandamzi.memberservice.common.response.ResponseService;
import com.tandamzi.memberservice.common.result.Result;
import com.tandamzi.memberservice.exception.member.MemberNotFoundException;
import io.jsonwebtoken.JwtException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
@RequiredArgsConstructor
public class ExceptionAdvice {

    private final ResponseService responseService;

    @ExceptionHandler(JwtException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public Result jwtException(){
        return responseService.getFailureResult(-99, "토큰이 없습니다.");
    }

    @ExceptionHandler(MemberNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public Result memberNotFoundException(){
        return responseService.getFailureResult(-100, "해당 회원을 찾을 수 없습니다.");
    }

}
