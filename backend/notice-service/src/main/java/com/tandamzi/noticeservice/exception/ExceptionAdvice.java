package com.tandamzi.noticeservice.exception;


import com.tandamzi.noticeservice.common.response.ResponseService;
import com.tandamzi.noticeservice.common.result.Result;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
@RequiredArgsConstructor
public class ExceptionAdvice {

    private final ResponseService responseService;
    @ExceptionHandler(NoticeNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public Result NoticeNotFoundException() {
        return responseService.getFailureResult(-303,"해당 알림을 찾을 수 없습니다.");
    }

//    @ExceptionHandler(OrderStatusNotEqualsException.class)
//    @ResponseStatus(HttpStatus.NOT_FOUND)
//    public Result OrderStatusNotEqualsException() {
//        return responseService.getFailureResult(-302,"주문 상태가 일치하지 않습니다.");
//    }

}
