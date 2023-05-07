package com.tandamzi.storeservice.exception;


import com.tandamzi.storeservice.common.response.ResponseService;
import com.tandamzi.storeservice.common.result.Result;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
@RequiredArgsConstructor
public class ExceptionAdvice {

    private final ResponseService responseService;

    @ExceptionHandler(TypeNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public Result typeNotFoundException(){
        return responseService.getFailureResult(-200, "해당하는 업종이 없습니다.");
    }

    @ExceptionHandler(CherryBoxQuantityInsufficientException.class)
    @ResponseStatus(HttpStatus.NOT_ACCEPTABLE)
    public Result CherryBoxQuantityInsufficientException() {
        return responseService.getFailureResult(-201,"해당 가게에 대한 체리박스 수량이 부족합니다.");
    }

    @ExceptionHandler(StoreNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public Result StoreNotFoundException() {
        return responseService.getFailureResult(-202,"해당 가게에 대한 정보를 찾을 수 없습니다.");
    }

    @ExceptionHandler(CherryBoxNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public Result CherryBoxNotFoundException() {
        return responseService.getFailureResult(-203,"체리박스 정보를 찾을 수 없습니다.");
    }

    @ExceptionHandler(BusinessLicenseNotValidException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public Result BusinessLicenseNotValidException() {
        return responseService.getFailureResult(-204,"사업자 등록번호 정보를 찾을 수 없습니다");
    }

    @ExceptionHandler(BusinessPermissionNotValidException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public Result BusinessPermissionNotValidException() {
        return responseService.getFailureResult(-205,"사업자 허가 정보를 찾을 수 없습니다");
    }
    @ExceptionHandler(StoreNotOpenException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public Result StoreNotOpenException() {
        return responseService.getFailureResult(-300,"해당 가게 오픈 시간이 아닙니다.");
    }

}
