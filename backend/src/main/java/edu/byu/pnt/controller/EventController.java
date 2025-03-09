package edu.byu.pnt.controller;

import edu.byu.pnt.request.AddEventRequest;
import edu.byu.pnt.request.UpdateEventRequest;
import edu.byu.pnt.response.event.AddEventResponse;
import edu.byu.pnt.response.event.DeleteEventResponse;
import edu.byu.pnt.response.event.GetEventResponse;
import edu.byu.pnt.response.event.UpdateEventResponse;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/event")
public class EventController {

    @GetMapping("/{id}")
    public GetEventResponse getEvent(@PathVariable String id) {
        return new GetEventResponse(false, "Not implemented yet");
    }

    @DeleteMapping("/{id}")
    public DeleteEventResponse deleteEvent(@PathVariable String id) {
        return new DeleteEventResponse(false, "Not implemented yet");
    }

    @PostMapping("/add")
    public AddEventResponse addEvent(@Valid @RequestBody AddEventRequest request) {
        return new AddEventResponse(false, "Not implemented yet");
    }

    @PostMapping("/update")
    public UpdateEventResponse updateEvent(@Valid @RequestBody UpdateEventRequest request) {
        return new UpdateEventResponse(false, "Not implemented yet");
    }
}
