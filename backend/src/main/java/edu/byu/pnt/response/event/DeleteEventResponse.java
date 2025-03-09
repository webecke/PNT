package edu.byu.pnt.response.event;

import edu.byu.pnt.response.Response;

public class DeleteEventResponse extends Response {
    public DeleteEventResponse(boolean success, String message) {
        super(success, message);
    }
}
