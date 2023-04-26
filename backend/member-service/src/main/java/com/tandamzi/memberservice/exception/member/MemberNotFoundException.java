package com.tandamzi.memberservice.exception.member;

public class MemberNotFoundException extends RuntimeException{
    public MemberNotFoundException() {
        super();
    }

    public MemberNotFoundException(String message) {
        super(message);
    }

    public MemberNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public MemberNotFoundException(Throwable cause) {
        super(cause);
    }

    protected MemberNotFoundException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
