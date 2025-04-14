package edu.byu.pnt.response.event;

import edu.byu.pnt.response.Response;

public class AddEventResponse extends Response {
    String id;
    public AddEventResponse(boolean success, String message, String id) {
        super(success, message);
        this.id = id;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
}
