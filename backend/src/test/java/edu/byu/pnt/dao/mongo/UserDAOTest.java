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
    private User testUser;

    @BeforeEach
    void setUp() throws DataAccessException {
        // Get DAO
        factory = new FactoryProvider().getFactory();
        userDAO = factory.createUserDAO();

        // Create test user
        final String testID = "TESTING_ID";
        final String testFirstName = "TEST_FIRST_NAME";
        final String testLastName = "TEST_LAST_NAME";
        final String testUsername = "TESTING_USERNAME";
        final String testPassword = "TESTING_PASSWORD";
        testUser = new User(testFirstName, testLastName, testUsername, testPassword);

        // Delete testing user if in database
        userDAO.deleteUser(testUser.getUsername());
    }

    @Test
    void addUser() throws DataAccessException {
        // Add user, then retrieve user
        userDAO.addUser(testUser);
        User newUser = userDAO.getUser(testUser.getUsername());

        // Assert values unchanged
        assertEquals(newUser.getUsername(), testUser.getUsername(), "ID (username) changed after added.");
        assertEquals(newUser.getFirstName(), testUser.getFirstName(), "First name changed after added.");
        assertEquals(newUser.getLastName(), testUser.getLastName(), "Last name changed after added.");
        assertEquals(newUser.getPassword(), testUser.getPassword(), "Password changed after added.");
    }

    @Test
    void getUser() throws DataAccessException {
        // Add user, then retrieve user
        userDAO.addUser(testUser);
        User newUser = userDAO.getUser(testUser.getUsername());

        // Assert values unchanged
        assertEquals(newUser.getUsername(), testUser.getUsername(), "ID (username) changed after get.");
        assertEquals(newUser.getFirstName(), testUser.getFirstName(), "First name changed after get.");
        assertEquals(newUser.getLastName(), testUser.getLastName(), "Last name changed after get.");
        assertEquals(newUser.getPassword(), testUser.getPassword(), "Password changed after get.");
    }

    @Test
    void deleteUser() throws DataAccessException {
        // Add user, then delete
        userDAO.addUser(testUser);
        userDAO.deleteUser(testUser.getUsername());

        // Assert retrieval fails
        assertThrows(DataAccessException.class, () -> userDAO.getUser(testUser.getUsername()));
    }

    @Test
    void updateUser() throws DataAccessException {
        // Updated values
        String updatedFirstName = "UPDATED_FIRST_NAME";
        String updatedLastName = "UPDATED_LAST_NAME";
        String updatedPassword = "UPDATED_PASSWORD";

        // Add user, update values, then retrieve
        userDAO.addUser(testUser);
        userDAO.updateUser(updatedFirstName, updatedLastName, testUser.getUsername(), updatedPassword);
        User updatedUser = userDAO.getUser(testUser.getUsername());

        // Assert values were updated
        assertEquals(updatedUser.getUsername(), testUser.getUsername(), "ID (username) changed after update.");
        assertEquals(updatedUser.getFirstName(), updatedFirstName, "First name not updated.");
        assertEquals(updatedUser.getLastName(), updatedLastName, "Last name not updated.");
        assertEquals(updatedUser.getPassword(), updatedPassword, "Password not updated.");
    }
}
