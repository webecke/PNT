package edu.byu.pnt.response.auth;

import edu.byu.pnt.response.Response;

public class LoginResponse extends Response {
    public LoginResponse(boolean success, String message) {
        super(success, message);
    }
}
