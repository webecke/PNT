package edu.byu.pnt.dao.mongo;

import edu.byu.pnt.dao.DataAccessException;
import edu.byu.pnt.dao.factory.DAOFactory;
import edu.byu.pnt.dao.factory.FactoryProvider;
import edu.byu.pnt.dao.provider.EventCategoryDAO;
import edu.byu.pnt.model.EventCategory;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

public class EventCategoryDAOTest {

    private DAOFactory factory;
    private EventCategoryDAO dao;

    private EventCategory testEventCategory;

    @BeforeEach
    void setUp() throws DataAccessException {
        // Get DAO
        factory = new FactoryProvider().getFactory();
        dao = factory.createEventCategoryDAO();

        // Create test EventCategory
        final String testEventID = "TEST_EVENT_ID";
        final String testCategoryID = "TEST_CATEGORY_ID";
        testEventCategory = new EventCategory(testEventID, testCategoryID);

        // Delete testing event-category if it exists in the database
        dao.deleteEventCategory(testEventCategory);
    }

    @Test
    void addEventCategory() throws DataAccessException {
        // Add the event category
        dao.addEventCategory(testEventCategory);

        // Retrieve the event categories by eventID
        List<EventCategory> eventCategories = dao.getEventCategoriesByEvent(testEventCategory.eventID());

        // Assert the event category was added successfully
        assertNotNull(eventCategories, "Event category should exist after being added.");
        assertEquals(1, eventCategories.size(), "There should be exactly 1 event category for the event.");
        assertEquals(testEventCategory.eventID(), eventCategories.get(0).eventID(), "Event ID mismatch.");
        assertEquals(testEventCategory.categoryID(), eventCategories.get(0).categoryID(), "Category ID mismatch.");
    }

    @Test
    void getEventCategoriesByCategory() throws DataAccessException {
        // Add the event category
        dao.addEventCategory(testEventCategory);

        // Retrieve the event categories by categoryID
        List<EventCategory> eventCategories = dao.getEventCategoriesByCategory(testEventCategory.categoryID());

        // Assert the event category is correctly retrieved by categoryID
        assertNotNull(eventCategories, "Event categories should exist for the given category ID.");
        assertEquals(1, eventCategories.size(), "There should be exactly 1 event category for the category.");
        assertEquals(testEventCategory.eventID(), eventCategories.get(0).eventID(), "Event ID mismatch.");
        assertEquals(testEventCategory.categoryID(), eventCategories.get(0).categoryID(), "Category ID mismatch.");
    }

    @Test
    void getEventCategoriesByEvent() throws DataAccessException {
        // Add the event category
        dao.addEventCategory(testEventCategory);

        // Retrieve the event categories by eventID
        List<EventCategory> eventCategories = dao.getEventCategoriesByEvent(testEventCategory.eventID());

        // Assert the event category is correctly retrieved by eventID
        assertNotNull(eventCategories, "Event categories should exist for the given event ID.");
        assertEquals(1, eventCategories.size(), "There should be exactly 1 event category for the event.");
        assertEquals(testEventCategory.eventID(), eventCategories.get(0).eventID(), "Event ID mismatch.");
        assertEquals(testEventCategory.categoryID(), eventCategories.get(0).categoryID(), "Category ID mismatch.");
    }

    @Test
    void deleteEventCategory() throws DataAccessException {
        // Add the event category
        dao.addEventCategory(testEventCategory);

        // Delete the event category
        dao.deleteEventCategory(testEventCategory);

        // Attempt to retrieve the event category by eventID
        List<EventCategory> eventCategories = dao.getEventCategoriesByEvent(testEventCategory.eventID());

        // Assert the event category is deleted
        assertTrue(eventCategories.isEmpty(), "The event category should be deleted and not found.");
    }

    @Test
    void deleteNonExistentEventCategory() throws DataAccessException {
        // Try deleting a non-existent event category
        dao.deleteEventCategory(testEventCategory);

        // Attempt to retrieve the event category by eventID
        List<EventCategory> eventCategories = dao.getEventCategoriesByEvent(testEventCategory.eventID());

        // Assert the event category is still not found
        assertTrue(eventCategories.isEmpty(), "The event category should still not be found.");
    }
}
