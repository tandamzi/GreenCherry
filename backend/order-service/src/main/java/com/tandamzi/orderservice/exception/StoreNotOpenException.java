package com.tandamzi.orderservice.exception;

public class StoreNotOpenException extends RuntimeException{
    public StoreNotOpenException() {
    }

    public StoreNotOpenException(String message) {
        super(message);
    }

    public StoreNotOpenException(String message, Throwable cause) {
        super(message, cause);
    }

    public StoreNotOpenException(Throwable cause) {
        super(cause);
    }

    public StoreNotOpenException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
