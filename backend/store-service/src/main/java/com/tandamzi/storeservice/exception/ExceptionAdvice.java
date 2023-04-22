package com.tandamzi.storeservice.exception;


import com.tandamzi.storeservice.common.response.ResponseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
@RequiredArgsConstructor
public class ExceptionAdvice {

    private final ResponseService responseService;

//    @ExceptionHandler(JwtException.class)
//    @ResponseStatus(HttpStatus.UNAUTHORIZED)
//    public Result jwtException(){
//        return responseService.getFailureResult(-99, "토큰이 없습니다.");
//    }

}
