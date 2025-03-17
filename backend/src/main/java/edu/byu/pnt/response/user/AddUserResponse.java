package edu.byu.pnt.response.user;

import com.fasterxml.jackson.annotation.JsonProperty;
import edu.byu.pnt.model.User;
import edu.byu.pnt.response.Response;

public class AddUserResponse extends Response {
    private final User user;
    private final String token;

    public AddUserResponse(boolean success, String message, User user, String token) {
        super(success, message);
        this.user = user;
        this.token = token;
    }

    @JsonProperty("token")
    public String getToken() {
        return token;
    }
    @JsonProperty("user")
    public User getUser() {
        return user;
    }
}
