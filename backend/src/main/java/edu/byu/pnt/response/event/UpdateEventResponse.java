package edu.byu.pnt.response.event;

import edu.byu.pnt.response.Response;

public class UpdateEventResponse extends Response {
    public UpdateEventResponse(boolean success, String message) {
        super(success, message);
    }
}
