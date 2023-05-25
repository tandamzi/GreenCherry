package com.tandamzi.storeservice.exception;

public class BusinessLicenseNotValidException extends RuntimeException {
    public BusinessLicenseNotValidException() {
    }

    public BusinessLicenseNotValidException(String message) {
        super(message);
    }

    public BusinessLicenseNotValidException(String message, Throwable cause) {
        super(message, cause);
    }

    public BusinessLicenseNotValidException(Throwable cause) {
        super(cause);
    }

    public BusinessLicenseNotValidException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
