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
import java.util.UUID;

@RestController
@RequestMapping("/event")
public class EventController extends Controller {

    @GetMapping("/{id}")
    public GetEventResponse getEvent(
            @RequestHeader("Authorization") String token,
            @PathVariable String id) {
        try {
            // Authenticate token
            this.authenticate(token);

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
    public DeleteEventResponse deleteEvent(
            @RequestHeader("Authorization") String token,
            @PathVariable String id) {
        try {
            // Authenticate token
            this.authenticate(token);

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
    public AddEventResponse addEvent(
            @RequestHeader("Authorization") String token,
            @Valid @RequestBody AddEventRequest request) {
        try {
            // Authenticate token
            this.authenticate(token);

            // Create factory and DAO classes
            DAOFactory factory = new FactoryProvider().getFactory();
            EventDAO eventDAO = factory.createEventDAO();
            EventCategoryDAO eventCategoryDAO = factory.createEventCategoryDAO();
            EventContactDAO eventContactDAO = factory.createEventContactDAO();

            // Generate ID
            String id = UUID.randomUUID().toString();

            // Add the event-categories
            for (String categoryID : request.categories()) {
                EventCategory eventCategory = new EventCategory(id, categoryID);
                eventCategoryDAO.addEventCategory(eventCategory);
            }

            // Add the event-contacts
            for (String contactID : request.contacts()) {
                EventContact eventContact = new EventContact(id, contactID);
                eventContactDAO.addEventContact(eventContact);
            }

            // Add the event fragment
            EventFragment eventFragment = new EventFragment(id, request.title(), request.date(), request.description());
            eventDAO.addEventFragment(eventFragment);

            return new AddEventResponse(true, null);
        } catch (DataAccessException e) {
            return new AddEventResponse(false, e.getMessage());
        }
    }

    @PostMapping("/update")
    public UpdateEventResponse updateEvent(
            @RequestHeader("Authorization") String token,
            @Valid @RequestBody UpdateEventRequest request) {
        try {
            // Authenticate token
            this.authenticate(token);

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
