package edu.byu.pnt.response.user;

import edu.byu.pnt.response.Response;

public class UpdateUserResponse extends Response {
    public UpdateUserResponse(boolean success, String message) {
        super(success, message);
    }
}
