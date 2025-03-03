package edu.byu.pnt.dao.mongo;

import edu.byu.pnt.dao.DataAccessException;
import edu.byu.pnt.dao.factory.DAOFactory;
import edu.byu.pnt.dao.factory.FactoryProvider;
import edu.byu.pnt.dao.provider.EventDAO;
import edu.byu.pnt.model.Event;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;
public class EventDAOTest {

    private DAOFactory factory;
    private EventDAO eventDAO;
    private final String testID = "TESTING_ID";
    private Event testEvent;

    @BeforeEach
    void setUp() throws DataAccessException {
        factory = new FactoryProvider().getFactory();
        eventDAO = factory.createEventDAO();
//        testEvent = new Event()
        // Delete testing event if in database
//        eventDAO.deleteEvent(testEvent.getID());
    }

    @Test
    void addEvent() throws DataAccessException {
        // TODO implement addEvent test
    }
    @Test
    void getEvent() throws DataAccessException {
        // TODO implement getEvent test
    }
    @Test
    void deleteEvent() {
        // TODO implement deleteEvent test
    }
    @Test
    void updateEvent() {
        // TODO implement updateEvent test
    }
}
