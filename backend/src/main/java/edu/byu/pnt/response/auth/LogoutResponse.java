package edu.byu.pnt.response.auth;

import edu.byu.pnt.response.Response;

public class LogoutResponse extends Response {
    public LogoutResponse(boolean success, String message) {
        super(success, message);
    }
}
