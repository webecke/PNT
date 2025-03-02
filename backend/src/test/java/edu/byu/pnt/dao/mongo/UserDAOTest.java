package edu.byu.pnt.dao.mongo;

import edu.byu.pnt.dao.DataAccessException;
import edu.byu.pnt.dao.factory.DAOFactory;
import edu.byu.pnt.dao.factory.FactoryProvider;
import edu.byu.pnt.dao.provider.UserDAO;
import edu.byu.pnt.model.User;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

//<dependency>
//        <groupId>org.mongodb</groupId>
//        <artifactId>mongodb-driver-sync</artifactId>
//        <version>4.8.0</version>
//        </dependency>

import static org.junit.jupiter.api.Assertions.*;
public class UserDAOTest {

    private DAOFactory factory;
    private UserDAO userDAO;
    private String testID = "TESTING_ID";
    private String testName = "TESTING NAME";
    private String testUsername = "TESTING_USERNAME";
    private String testPassword = "TESTING_PASSWORD";
    private User testUser;

    @BeforeEach
    void setUp() throws DataAccessException {
        factory = new FactoryProvider().getFactory();
        userDAO = factory.createUserDAO();
        testUser = new User(testID, testName, testUsername, testPassword);
        // Delete testing user if in database
        userDAO.deleteUser(testUser.getID());
    }

    @Test
    void addUser() {
        try {
            userDAO.addUser(testID, testName, testUsername, testPassword);
            User newUser = userDAO.getUser(testID);
            assert(newUser.getID().equals(testID));
            assert(newUser.getName().equals(testName));
            assert(newUser.getUsername().equals(testUsername));
            assert(newUser.getHashedPassword().equals(testPassword));
        }
        catch (DataAccessException e) {
            fail(e.getMessage());
        }
    }

    @Test
    void getUser() {
        try {
            userDAO.addUser(testID, testName, testUsername, testPassword);
            User newUser = userDAO.getUser(testID);
            assert(newUser.getID().equals(testID));
            assert(newUser.getName().equals(testName));
            assert(newUser.getUsername().equals(testUsername));
            assert(newUser.getHashedPassword().equals(testPassword));
        }
        catch (DataAccessException e) {
            fail(e.getMessage());
        }
    }

    @Test
    void deleteUser() {
        try {
            userDAO.addUser(testID, testName, testUsername, testPassword);
            userDAO.deleteUser(testID);
            User newUser = userDAO.getUser(testID);
            fail("Found deleted user in database.");
        }
        catch (DataAccessException e) {
            // Check that exception with "User not found" was thrown
            if (!e.getMessage().contains("User not found")) {
                fail(e.getMessage());
            }
        }
    }

    // TODO update user test
}
