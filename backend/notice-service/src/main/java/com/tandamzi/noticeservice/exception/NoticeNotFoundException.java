package com.tandamzi.noticeservice.exception;

public class NoticeNotFoundException extends RuntimeException{
    public NoticeNotFoundException() {
    }

    public NoticeNotFoundException(String message) {
        super(message);
    }

    public NoticeNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public NoticeNotFoundException(Throwable cause) {
        super(cause);
    }

    public NoticeNotFoundException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }

}
