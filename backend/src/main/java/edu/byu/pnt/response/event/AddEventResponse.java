package edu.byu.pnt.response.event;

import edu.byu.pnt.response.Response;

public class AddEventResponse extends Response {
    public AddEventResponse(boolean success, String message) {
        super(success, message);
    }
}
