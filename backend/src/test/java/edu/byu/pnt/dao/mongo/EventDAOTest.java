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
    void addUser() throws DataAccessException {
        // TODO implement addUser test
    }
    @Test
    void getUser() throws DataAccessException {
        // TODO implement getUser test
    }
    @Test
    void deleteUser() {
        // TODO implement deleteUser test
    }
    @Test
    void updateUser() {
        // TODO implement updateUser test
    }
}
