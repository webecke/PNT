package edu.byu.pnt.response.auth;

import com.fasterxml.jackson.annotation.JsonProperty;
import edu.byu.pnt.model.Authtoken;
import edu.byu.pnt.response.Response;

public class LoginResponse extends Response {

    private final Authtoken authtoken;
    public LoginResponse(boolean success, String message, Authtoken authtoken) {
        super(success, message);
        this.authtoken = authtoken;
    }

    @JsonProperty("authtoken")
    public Authtoken getAuthtoken() {
        return authtoken;
    }
}
