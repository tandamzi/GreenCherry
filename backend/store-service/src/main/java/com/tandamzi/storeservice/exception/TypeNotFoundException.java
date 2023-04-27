package com.tandamzi.storeservice.exception;

public class TypeNotFoundException extends RuntimeException{
    public TypeNotFoundException() {
    }

    public TypeNotFoundException(String message) {
        super(message);
    }

    public TypeNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public TypeNotFoundException(Throwable cause) {
        super(cause);
    }

    public TypeNotFoundException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
