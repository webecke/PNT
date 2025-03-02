package edu.byu.pnt.dao.mongo;

import edu.byu.pnt.dao.DataAccessException;
import edu.byu.pnt.dao.factory.DAOFactory;
import edu.byu.pnt.dao.factory.FactoryProvider;
import edu.byu.pnt.dao.provider.UserDAO;
import edu.byu.pnt.model.User;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;
public class UserDAOTest {

    private UserDAO userDAO;
    private String testID = "TESTING_ID";
    private String testName = "TESTING NAME";
    private String testUsername = "TESTING_USERNAME";
    private String testPassword = "TESTING_PASSWORD";
    private User testUser;


    @BeforeEach
    void setUp() {
        final DAOFactory factory = new FactoryProvider().getFactory();
        userDAO = factory.createUserDAO();
        testUser = new User(testID, testName, testUsername, testPassword);
    }

    @Test
    void addUser() {
        try {
            userDAO.addUser(testID, testName, testUsername, testPassword);
        }
        catch (DataAccessException e) {
            fail(e.getMessage());
        }
//        User newUser = userDAO.getUser(testID);

    }
}
