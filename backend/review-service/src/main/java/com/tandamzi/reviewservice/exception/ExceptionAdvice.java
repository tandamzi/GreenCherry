package com.tandamzi.reviewservice.exception;


import com.tandamzi.reviewservice.common.response.ResponseService;
import com.tandamzi.reviewservice.common.result.Result;
import com.tandamzi.reviewservice.exception.tag.TagNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
@RequiredArgsConstructor
public class ExceptionAdvice {

    private final ResponseService responseService;

    @ExceptionHandler(TagNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public Result typeNotFoundException(){
        return responseService.getFailureResult(-400, "해당 태그가 없습니다.");
    }

}
