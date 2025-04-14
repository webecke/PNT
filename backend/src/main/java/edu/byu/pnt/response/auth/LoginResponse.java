package edu.byu.pnt.response.auth;

import com.fasterxml.jackson.annotation.JsonProperty;
import edu.byu.pnt.model.User;
import edu.byu.pnt.response.Response;



public class LoginResponse extends Response {

    private final String token;

    private User user;
    
    public LoginResponse(boolean success, String message, String token, User user) {
        super(success, message);
        this.token = token;
        this.user = user;
    }

    @JsonProperty("authtoken")
    public String getToken() {
        return token;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
