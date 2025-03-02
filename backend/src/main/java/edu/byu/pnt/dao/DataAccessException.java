package edu.byu.pnt.dao;

public class DataAccessException extends Exception {
    private final String message;
    public DataAccessException(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }
}
