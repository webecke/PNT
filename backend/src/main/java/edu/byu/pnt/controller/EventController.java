package edu.byu.pnt.controller;

import edu.byu.pnt.dao.DataAccessException;
import edu.byu.pnt.dao.factory.DAOFactory;
import edu.byu.pnt.dao.factory.FactoryProvider;
import edu.byu.pnt.dao.provider.*;
import edu.byu.pnt.model.*;
import edu.byu.pnt.request.AddEventRequest;
import edu.byu.pnt.request.UpdateEventRequest;
import edu.byu.pnt.response.contact.GetContactResponse;
import edu.byu.pnt.response.event.AddEventResponse;
import edu.byu.pnt.response.event.DeleteEventResponse;
import edu.byu.pnt.response.event.GetEventResponse;
import edu.byu.pnt.response.event.UpdateEventResponse;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/event")
public class EventController extends Controller {

    @GetMapping("/{id}")
    public GetEventResponse getEvent(@PathVariable String id) {
        // TODO authenticate
        try {
            // Create factory and DAO classes
            DAOFactory factory = new FactoryProvider().getFactory();
            EventDAO eventDAO = factory.createEventDAO();

            // Build EventFragment into Event
            EventFragment fragment = eventDAO.getEventFragment(id);
            Event event = this.buildEvent(fragment);

            return new GetEventResponse(true, null, event);
        } catch (DataAccessException e) {
            return new GetEventResponse(false, e.getMessage(), null);
        }
    }

    @DeleteMapping("/{id}")
    public DeleteEventResponse deleteEvent(@PathVariable String id) {
        // TODO authenticate
        try {
            // Create factory and DAO classes
            DAOFactory factory = new FactoryProvider().getFactory();
            EventDAO eventDAO = factory.createEventDAO();
            EventCategoryDAO eventCategoryDAO = factory.createEventCategoryDAO();
            EventContactDAO eventContactDAO = factory.createEventContactDAO();

            // Delete the event-categories
            List<EventCategory> eventCategories = eventCategoryDAO.getEventCategoriesByEvent(id);
            for (EventCategory eventCategory : eventCategories) {
                eventCategoryDAO.deleteEventCategory(eventCategory);
            }

            // Delete the event-contacts
            List<EventContact> eventContacts = eventContactDAO.getEventContactsByEventID(id);
            for (EventContact eventContact : eventContacts) {
                eventContactDAO.deleteEventContact(eventContact);
            }

            // Delete the event fragment
            eventDAO.deleteEventFragment(id);

            return new DeleteEventResponse(true, null);
        } catch (DataAccessException e) {
            return new DeleteEventResponse(false, e.getMessage());
        }
    }

    @PostMapping("/add")
    public AddEventResponse addEvent(@Valid @RequestBody AddEventRequest request) {
        // TODO authenticate
        try {
            // Create factory and DAO classes
            DAOFactory factory = new FactoryProvider().getFactory();
            EventDAO eventDAO = factory.createEventDAO();
            EventCategoryDAO eventCategoryDAO = factory.createEventCategoryDAO();
            EventContactDAO eventContactDAO = factory.createEventContactDAO();

            // Add the event-categories
            for (String categoryID : request.categories()) {
                EventCategory eventCategory = new EventCategory(request.id(), categoryID);
                eventCategoryDAO.addEventCategory(eventCategory);
            }

            // Add the event-contacts
            for (String contactID : request.contacts()) {
                EventContact eventContact = new EventContact(request.id(), contactID);
                eventContactDAO.addEventContact(eventContact);
            }

            // Add the event fragment
            EventFragment eventFragment = new EventFragment(request.id(), request.title(), request.date(), request.description());
            eventDAO.addEventFragment(eventFragment);

            return new AddEventResponse(true, null);
        } catch (DataAccessException e) {
            return new AddEventResponse(false, e.getMessage());
        }
    }

    @PostMapping("/update")
    public UpdateEventResponse updateEvent(@Valid @RequestBody UpdateEventRequest request) {
        // TODO authenticate
        try {
            // Create factory and DAO classes
            DAOFactory factory = new FactoryProvider().getFactory();
            EventDAO eventDAO = factory.createEventDAO();
            EventCategoryDAO eventCategoryDAO = factory.createEventCategoryDAO();
            EventContactDAO eventContactDAO = factory.createEventContactDAO();

            // Update the event-categories (delete and re-add)
            List<EventCategory> eventCategories = eventCategoryDAO.getEventCategoriesByEvent(request.id());
            for (EventCategory eventCategory : eventCategories) {
                eventCategoryDAO.deleteEventCategory(eventCategory);
            }
            for (String categoryID : request.categories()) {
                EventCategory eventCategory = new EventCategory(request.id(), categoryID);
                eventCategoryDAO.addEventCategory(eventCategory);
            }

            // Update the event-contacts (delete and re-add)
            List<EventContact> eventContacts = eventContactDAO.getEventContactsByEventID(request.id());
            for (EventContact eventContact : eventContacts) {
                eventContactDAO.deleteEventContact(eventContact);
            }
            for (String contactID : request.contacts()) {
                EventContact eventContact = new EventContact(request.id(), contactID);
                eventContactDAO.addEventContact(eventContact);
            }

            // Update the event fragment
            eventDAO.updateEventFragment(request.id(), request.title(), request.date(), request.description());

            return new UpdateEventResponse(true, null);
        } catch (DataAccessException e) {
            return new UpdateEventResponse(false, e.getMessage());
        }
    }
}
