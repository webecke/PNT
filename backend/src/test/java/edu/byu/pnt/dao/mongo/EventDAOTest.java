package edu.byu.pnt.dao.mongo;

import edu.byu.pnt.dao.DataAccessException;
import edu.byu.pnt.dao.factory.DAOFactory;
import edu.byu.pnt.dao.factory.FactoryProvider;
import edu.byu.pnt.dao.provider.EventDAO;
import edu.byu.pnt.model.EventFragment;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;
public class EventDAOTest {

    private DAOFactory factory;
    private EventDAO eventDAO;
    private EventFragment testEvent;

    @BeforeEach
    void setUp() throws DataAccessException {
        // Get DAO
        factory = new FactoryProvider().getFactory();
        eventDAO = factory.createEventDAO();

        // Create test event
        final String testID = "TESTING_ID";
        final String testTitle = "TESTING_TITLE";
        final String testDate = "TEST_DATE";
        final String testDescription = "TEST_DESCRIPTION";
        testEvent = new EventFragment(testID, testTitle, testDate, testDescription);

        // Delete testing event if in database
        eventDAO.deleteEventFragment(testEvent.id());
    }

    @Test
    void addEvent() throws DataAccessException {
        // Add and then get the event fragment
        eventDAO.addEventFragment(testEvent);
        EventFragment newEvent = eventDAO.getEventFragment(testEvent.id());

        // Assert values are unchanged
        assertEquals(newEvent.id(), testEvent.id(), "ID changed after being added.");
        assertEquals(newEvent.title(), testEvent.title(), "Title changed after being added.");
        assertEquals(newEvent.date(), testEvent.date(), "Date changed after being added.");
        assertEquals(newEvent.description(), testEvent.description(), "Description changed after being added.");
    }
    @Test
    void getEvent() throws DataAccessException {
        // Add and then get the event fragment
        eventDAO.addEventFragment(testEvent);
        EventFragment newEvent = eventDAO.getEventFragment(testEvent.id());

        // Assertions values are unchanged
        assertEquals(newEvent.id(), testEvent.id(), "ID changed after get.");
        assertEquals(newEvent.title(), testEvent.title(), "Title changed after get.");
        assertEquals(newEvent.date(), testEvent.date(), "Date changed after get.");
        assertEquals(newEvent.description(), testEvent.description(), "Description changed after get.");
    }
    @Test
    void deleteEvent() throws DataAccessException {
        // Add and then delete event fragment
        eventDAO.addEventFragment(testEvent);
        eventDAO.deleteEventFragment(testEvent.id());

        // Assert retrieval fails
        assertThrows(DataAccessException.class, () -> eventDAO.getEventFragment(testEvent.id()));
    }
    @Test
    void updateEvent() throws DataAccessException {
        // Updated testing values
        String updatedTitle = "UPDATED_EVENT_TITLE";
        String updatedDate = "UPDATED_EVENT_DATE";
        String updatedDescription = "UPDATED_EVENT_DESCRIPTION";

        // Add event fragment, update it, then retrieve it
        eventDAO.addEventFragment(testEvent);
        eventDAO.updateEventFragment(testEvent.id(), updatedTitle, updatedDate, updatedDescription);
        EventFragment updatedEvent = eventDAO.getEventFragment(testEvent.id());

        // Assert values were updated
        assertEquals(updatedEvent.id(), testEvent.id(), "ID changed after update.");
        assertEquals(updatedEvent.title(), updatedTitle, "Title not updated");
        assertEquals(updatedEvent.date(), updatedDate, "Date not updated");
        assertEquals(updatedEvent.description(), updatedDescription, "Description not updated");
    }
}
