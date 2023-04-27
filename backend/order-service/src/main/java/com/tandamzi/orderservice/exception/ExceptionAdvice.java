package com.tandamzi.orderservice.exception;


import com.tandamzi.orderservice.common.response.ResponseService;
import com.tandamzi.orderservice.common.result.Result;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
@RequiredArgsConstructor
public class ExceptionAdvice {

    private final ResponseService responseService;


    @ExceptionHandler(CherryBoxQuantityInsufficientException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public Result CherryBoxQuantityInsufficientException() {
        return responseService.getFailureResult(-201,"해당 가게에 대한 체리박스 수량이 부족합니다.");
    }

    @ExceptionHandler(StoreNotOpenException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public Result StoreNotOpenException() {
        return responseService.getFailureResult(-300,"해당 가게 오픈 시간이 아닙니다.");
    }

}
