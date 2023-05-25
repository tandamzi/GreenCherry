package com.tandamzi.storeservice.exception;

public class BusinessPermissionNotValidException extends RuntimeException {
    public BusinessPermissionNotValidException() {
    }

    public BusinessPermissionNotValidException(String message) {
        super(message);
    }

    public BusinessPermissionNotValidException(String message, Throwable cause) {
        super(message, cause);
    }

    public BusinessPermissionNotValidException(Throwable cause) {
        super(cause);
    }

    public BusinessPermissionNotValidException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
