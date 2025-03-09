package edu.byu.pnt.controller;

import edu.byu.pnt.request.TimelineRequest;
import edu.byu.pnt.response.timeline.TimelineResponse;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/timeline")
public class TimelineController {

    @PostMapping("/")
    public TimelineResponse getTimeline(@Valid @RequestBody TimelineRequest request) {
        return new TimelineResponse(false, "Not implemented yet");
    }
}
