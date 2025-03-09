package edu.byu.pnt.response.event;

import edu.byu.pnt.response.Response;

public class GetEventResponse extends Response {
    public GetEventResponse(boolean success, String message) {
        super(success, message);
    }
}
