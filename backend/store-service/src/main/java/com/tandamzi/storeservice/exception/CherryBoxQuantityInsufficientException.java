package com.tandamzi.storeservice.exception;

public class CherryBoxQuantityInsufficientException extends RuntimeException{
    public CherryBoxQuantityInsufficientException() {
    }

    public CherryBoxQuantityInsufficientException(String message) {
        super(message);
    }

    public CherryBoxQuantityInsufficientException(String message, Throwable cause) {
        super(message, cause);
    }

    public CherryBoxQuantityInsufficientException(Throwable cause) {
        super(cause);
    }

    public CherryBoxQuantityInsufficientException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }

}
