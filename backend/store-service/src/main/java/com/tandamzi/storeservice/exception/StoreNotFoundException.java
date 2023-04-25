package com.tandamzi.storeservice.exception;

public class StoreNotFoundException extends RuntimeException{
    public StoreNotFoundException() {
    }

    public StoreNotFoundException(String message) {
        super(message);
    }

    public StoreNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public StoreNotFoundException(Throwable cause) {
        super(cause);
    }

    public StoreNotFoundException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
