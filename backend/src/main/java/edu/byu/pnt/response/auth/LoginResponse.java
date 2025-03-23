package edu.byu.pnt.response.auth;

import com.fasterxml.jackson.annotation.JsonProperty;
import edu.byu.pnt.model.Authtoken;
import edu.byu.pnt.response.Response;

public class LoginResponse extends Response {

    private final String token;
    public LoginResponse(boolean success, String message, String token) {
        super(success, message);
        this.token = token;
    }

    @JsonProperty("authtoken")
    public String getToken() {
        return token;
    }
}
