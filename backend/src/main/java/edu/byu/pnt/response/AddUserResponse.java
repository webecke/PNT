package edu.byu.pnt.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import edu.byu.pnt.model.User;

public class AddUserResponse extends Response {
    private final User user;

    public AddUserResponse(boolean success, String message, User user) {
        super(success, message);
        this.user = user;
    }

    @JsonProperty("user")
    public User getUser() {
        return user;
    }
}
