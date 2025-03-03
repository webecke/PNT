package edu.byu.pnt.dao.mongo;

import edu.byu.pnt.dao.DataAccessException;
import edu.byu.pnt.dao.factory.DAOFactory;
import edu.byu.pnt.dao.factory.FactoryProvider;
import edu.byu.pnt.dao.provider.UserDAO;
import edu.byu.pnt.model.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;
public class UserDAOTest {

    private DAOFactory factory;
    private UserDAO userDAO;
    private final String testID = "TESTING_ID";
    private final String testFirstName = "TEST_FIRST_NAME";
    private final String testLastName = "TEST_LAST_NAME";
    private final String testUsername = "TESTING_USERNAME";
    private final String testPassword = "TESTING_PASSWORD";
    private User testUser;

    @BeforeEach
    void setUp() throws DataAccessException {
        factory = new FactoryProvider().getFactory();
        userDAO = factory.createUserDAO();
        testUser = new User(testID, testFirstName, testLastName, testUsername, testPassword);
        // Delete testing user if in database
        userDAO.deleteUser(testUser.getID());
    }

    @Test
    void addUser() throws DataAccessException {
        userDAO.addUser(testID, testFirstName, testLastName, testUsername, testPassword);
        User newUser = userDAO.getUser(testID);
        assert(newUser.getID().equals(testID));
        assert(newUser.getFirstName().equals(testFirstName));
        assert(newUser.getLastName().equals(testLastName));
        assert(newUser.getUsername().equals(testUsername));
        assert(newUser.getPassword().equals(testPassword));
    }

    @Test
    void getUser() throws DataAccessException {
        userDAO.addUser(testID, testFirstName, testLastName, testUsername, testPassword);
        User newUser = userDAO.getUser(testID);
        assert(newUser.getID().equals(testID));
        assert(newUser.getFirstName().equals(testFirstName));
        assert(newUser.getLastName().equals(testLastName));
        assert(newUser.getUsername().equals(testUsername));
        assert(newUser.getPassword().equals(testPassword));
    }

    @Test
    void deleteUser() {
        try {
            userDAO.addUser(testID, testFirstName ,testLastName, testUsername, testPassword);
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

    @Test
    void updateUser() {
        String updatedFirstName = "UPDATED_FIRST_NAME";
        String updatedLastName = "UPDATED_LAST_NAME";
        String updatedUsername = "UPDATED_USERNAME";
        String updatedPassword = "UPDATED_PASSWORD";
        try {
            userDAO.addUser(testID, updatedFirstName, updatedLastName, testUsername, testPassword);
            userDAO.updateUser(testID, updatedFirstName, updatedLastName, updatedUsername, updatedPassword);
            User updatedUser = userDAO.getUser(testID);
            assert(updatedUser.getID().equals(testID));
            assert(updatedUser.getFirstName().equals(updatedFirstName));
            assert(updatedUser.getLastName().equals(updatedLastName));
            assert(updatedUser.getUsername().equals(updatedUsername));
            assert(updatedUser.getPassword().equals(updatedPassword));
        }
        catch (DataAccessException e) {
            fail(e.getMessage());
        }
    }
}
