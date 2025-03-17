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
public class TimelineController {

    @PostMapping("/")
    public TimelineResponse getTimeline(@Valid @RequestBody TimelineRequest request) {
        try {
            // Factory
            DAOFactory factory = new FactoryProvider().getFactory();

            // Get list of all events with category id
            EventCategoryDAO eventCategoryDAO = factory.createEventCategoryDAO();
            Set<String> eventIDsByCategory = new HashSet<>();
            for (String categoryID : request.categoryIDs()) {
                List<EventCategory> eventCategories = eventCategoryDAO.getEventCategoriesByCategory(categoryID);

                // Iterate through the eventCategories and add their id to eventIDs list
                for (EventCategory eventCategory : eventCategories) {
                    eventIDsByCategory.add(eventCategory.eventID());
                }
            }

            // Get list of all events with contact id
            EventContactDAO eventContactDAO = factory.createEventContactDAO();
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

            // Assemble the timeline and return
            EventDAO eventDAO = factory.createEventDAO();
            List<Event> timelineEvents = new ArrayList<>();
            for (String eventID : eventIDsByCategory) {
                EventFragment fragment = eventDAO.getEventFragment(eventID);
                List<String> contacts = new ArrayList<>();
                List<String> categories = new ArrayList<>();

                // TODO should timeline return references to contacts and categories or the objects themselves?
                // FIXME all events returned with blank contacts and categories

                // Create event and add to timeline
                Event event = new Event(fragment.id(), fragment.title(), fragment.date(), fragment.description(), contacts, categories);
                timelineEvents.add(event);
            }
            Timeline timeline = new Timeline(request.usersID(), timelineEvents);
            return new TimelineResponse(true, null, timeline);
        }
        catch (DataAccessException e) {
            return new TimelineResponse(false, e.getMessage(), null);
        }
    }
}
