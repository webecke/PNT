package edu.byu.pnt.controller;

import edu.byu.pnt.dao.DataAccessException;
import edu.byu.pnt.dao.factory.DAOFactory;
import edu.byu.pnt.dao.factory.FactoryProvider;
import edu.byu.pnt.dao.provider.EventCategoryDAO;
import edu.byu.pnt.dao.provider.EventContactDAO;
import edu.byu.pnt.dao.provider.EventDAO;
import edu.byu.pnt.dao.provider.UserDAO;
import edu.byu.pnt.model.*;
import edu.byu.pnt.request.TimelineRequest;
import edu.byu.pnt.response.timeline.TimelineResponse;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/timeline")
public class TimelineController extends Controller {

    @PostMapping("/")
    public TimelineResponse getTimeline(@RequestHeader("Authorization") String token, @Valid @RequestBody TimelineRequest request) {
        try {
            // Authenticate token
            this.authenticate(token);

            // Factory and DAOs
            DAOFactory factory = new FactoryProvider().getFactory();
            EventCategoryDAO eventCategoryDAO = factory.createEventCategoryDAO();
            EventContactDAO eventContactDAO = factory.createEventContactDAO();
            EventDAO eventDAO = factory.createEventDAO();

            // Get list of all events with category id
            Set<String> eventIDsByCategory = new HashSet<>();
            for (String categoryID : request.categoryIDs()) {
                List<EventCategory> eventCategories = eventCategoryDAO.getEventCategoriesByCategory(categoryID);

                // Iterate through the eventCategories and add their id to eventIDs list
                for (EventCategory eventCategory : eventCategories) {
                    eventIDsByCategory.add(eventCategory.eventID());
                }
            }

            // Get list of all events with contact id
            Set<String> eventIDsByContact = new HashSet<>();
            for (String contactID : request.contactIDs()) {
                List<EventContact> eventContacts = eventContactDAO.getEventContactsByContactID(contactID);

                // Add ids to event ids list
                for (EventContact eventContact : eventContacts) {
                    eventIDsByContact.add(eventContact.eventID());
                }
            }

            // Filter for events that match both criteria
            eventIDsByCategory.retainAll(eventIDsByContact);

            // Fetch timeline events
            List<Event> timelineEvents = new ArrayList<>();
            for (String eventID : eventIDsByCategory) {
                // Get the EventFragment and build into Event
                EventFragment fragment = eventDAO.getEventFragment(eventID);
                Event event = this.buildEvent(fragment);

                // Add event to timeline
                timelineEvents.add(event);
            }

            // TODO verify timeline events are sorted by datetime

            // Build timeline and return
            Timeline timeline = new Timeline(request.userID(), timelineEvents);
            return new TimelineResponse(true, null, timeline);
        }
        catch (DataAccessException e) {
            return new TimelineResponse(false, e.getMessage(), null);
        }
    }
}
