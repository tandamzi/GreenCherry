package com.tandamzi.storeservice.exception;

public class CherryBoxNotFoundException extends RuntimeException{
    public CherryBoxNotFoundException() {
    }

    public CherryBoxNotFoundException(String message) {
        super(message);
    }

    public CherryBoxNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public CherryBoxNotFoundException(Throwable cause) {
        super(cause);
    }

    public CherryBoxNotFoundException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }

}
