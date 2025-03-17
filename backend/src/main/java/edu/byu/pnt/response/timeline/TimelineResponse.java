package edu.byu.pnt.response.timeline;

import com.fasterxml.jackson.annotation.JsonProperty;
import edu.byu.pnt.model.Timeline;
import edu.byu.pnt.response.Response;

public class TimelineResponse extends Response {

    private Timeline timeline;

    public TimelineResponse(boolean success, String message, Timeline timeline) {

        super(success, message);
        this.timeline = timeline;
    }

    @JsonProperty("timeline")
    public Timeline getTimeline() {
        return timeline;
    }
}
