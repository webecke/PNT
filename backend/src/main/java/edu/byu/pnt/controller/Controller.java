package edu.byu.pnt.controller;

import edu.byu.pnt.dao.DataAccessException;
import edu.byu.pnt.dao.factory.DAOFactory;
import edu.byu.pnt.dao.factory.FactoryProvider;
import edu.byu.pnt.dao.provider.*;
import edu.byu.pnt.model.*;

import java.util.ArrayList;
import java.util.List;

public abstract class Controller {

    protected List<Category> getAllCategoriesByContactID(String id) throws DataAccessException {
        // Factory and DAOs
        DAOFactory factory = new FactoryProvider().getFactory();
        ContactCategoryDAO contactCategoryDAO = factory.createContactCategoryDAO();
        CategoryDAO categoryDAO = factory.createCategoryDAO();

        // Get the categories
        List<Category> categories = new ArrayList<>();
        List<ContactCategory> contactCategories = contactCategoryDAO.getContactCategoriesByContact(id);
        for (ContactCategory contactCategory : contactCategories) {
            Category category = categoryDAO.getCategory(contactCategory.categoryID());
            categories.add(category);
        }
        return categories;
    }

    protected Event buildEvent(EventFragment fragment) throws DataAccessException {
        // Factory and DAOs
        DAOFactory factory = new FactoryProvider().getFactory();
        EventCategoryDAO eventCategoryDAO = factory.createEventCategoryDAO();
        EventContactDAO eventContactDAO = factory.createEventContactDAO();

        // Get event-categories
        List<EventCategory> eventCategories = eventCategoryDAO.getEventCategoriesByEvent(fragment.id());
        List<String> categoryIDs = new ArrayList<>();
        for (EventCategory eventCategory : eventCategories) {
            categoryIDs.add(eventCategory.categoryID());
        }

        // Get event-contacts
        List<EventContact> eventContacts = eventContactDAO.getEventContactsByEventID(fragment.id());
        List<String> contactIDs = new ArrayList<>();
        for (EventContact eventContact : eventContacts) {
            contactIDs.add(eventContact.contactID());
        }

        // Create event
        return new Event(fragment.id(), fragment.title(), fragment.date(), fragment.description(), contactIDs, categoryIDs);
    }

    protected Authtoken authenticate(String token) throws DataAccessException {
        String errorMessage = "Invalid authtoken";

        // Check for null token
        if (token == null) {
            throw new DataAccessException(errorMessage);
        }

        // Factory and DAO
        DAOFactory factory = new FactoryProvider().getFactory();
        AuthtokenDAO authtokenDAO = factory.createAuthtokenDAO();

        // Check if authtoken is found
        try {
            return authtokenDAO.getAuthtokenByToken(token);
        } catch (DataAccessException e) {
            throw new DataAccessException(errorMessage);
        }
    }
}
