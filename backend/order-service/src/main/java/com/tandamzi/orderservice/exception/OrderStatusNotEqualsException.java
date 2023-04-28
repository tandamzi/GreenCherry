package com.tandamzi.orderservice.exception;

public class OrderStatusNotEqualsException extends RuntimeException{
    public OrderStatusNotEqualsException() {
    }

    public OrderStatusNotEqualsException(String message) {
        super(message);
    }

    public OrderStatusNotEqualsException(String message, Throwable cause) {
        super(message, cause);
    }

    public OrderStatusNotEqualsException(Throwable cause) {
        super(cause);
    }

    public OrderStatusNotEqualsException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }

}
