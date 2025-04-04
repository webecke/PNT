package edu.byu.pnt.response;

public class Response {
    private final boolean  success;
    private final String message;

    public Response(boolean success, String message) {
        this.success = success;
        this.message = message;
    }
    public boolean isSuccess() {
        return success;
    }

    public String getMessage() {
        return message;
    }
}
