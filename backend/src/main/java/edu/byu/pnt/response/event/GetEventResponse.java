package edu.byu.pnt.response.event;

import com.fasterxml.jackson.annotation.JsonProperty;
import edu.byu.pnt.model.Event;
import edu.byu.pnt.response.Response;

public class GetEventResponse extends Response {

    private final Event event;
    public GetEventResponse(boolean success, String message, Event event) {
        super(success, message);
        this.event = event;
    }
    @JsonProperty("event")
    public Event getEvent() {
        return event;
    }
}
