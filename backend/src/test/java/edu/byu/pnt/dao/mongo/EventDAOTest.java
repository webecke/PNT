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
    private final String testID = "TESTING_ID";
    private final String testTitle = "TESTING_TITLE";
    private final String testDate = "TEST_DATE";
    private final String testDescription = "TEST_DESCRIPTION";
    private EventFragment testEvent;

    @BeforeEach
    void setUp() throws DataAccessException {
        factory = new FactoryProvider().getFactory();
        eventDAO = factory.createEventDAO();
        testEvent = new EventFragment(testID, testTitle, testDate, testDescription);
        // Delete testing event if in database
        eventDAO.deleteEventFragment(testEvent.id());
    }

    @Test
    void addEvent() throws DataAccessException {
        eventDAO.addEventFragment(testEvent);
        EventFragment newEvent = eventDAO.getEventFragment(testEvent.id());
        assert(newEvent.id().equals(testID));
        assert(newEvent.title().equals(testEvent.title()));
        assert(newEvent.date().equals(testEvent.date()));
        assert(newEvent.description().equals(testEvent.description()));
    }
    @Test
    void getEvent() throws DataAccessException {
        eventDAO.addEventFragment(testEvent);
        EventFragment newEvent = eventDAO.getEventFragment(testEvent.id());
        assert(newEvent.id().equals(testID));
        assert(newEvent.title().equals(testEvent.title()));
        assert(newEvent.date().equals(testEvent.date()));
        assert(newEvent.description().equals(testEvent.description()));
    }
    @Test
    void deleteEvent() throws DataAccessException {
        eventDAO.addEventFragment(testEvent);
        eventDAO.deleteEventFragment(testEvent.id());
        assertThrows(DataAccessException.class, () -> eventDAO.getEventFragment(testEvent.id()));
    }
    @Test
    void updateEvent() {
        // TODO implement updateEvent test
    }
}
