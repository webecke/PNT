package edu.byu.pnt.dao.mongo;

import edu.byu.pnt.dao.DataAccessException;
import edu.byu.pnt.dao.factory.DAOFactory;
import edu.byu.pnt.dao.factory.FactoryProvider;
import edu.byu.pnt.dao.provider.AuthtokenDAO;
import edu.byu.pnt.model.Authtoken;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

public class AuthtokenDAOTest {

    private DAOFactory factory;
    private AuthtokenDAO dao;

    private Authtoken testAuthtoken;

    @BeforeEach
    void setUp() throws DataAccessException {
        // Get DAO
        factory = new FactoryProvider().getFactory();
        dao = factory.createAuthtokenDAO();

        // Create test authtoken
        final String testToken = "TEST_TOKEN";
        final String testUserID = "TEST_USER_ID";
        testAuthtoken = new Authtoken(testToken, testUserID);

        // Delete any existing authtoken for the user before the test
        try {
            Authtoken existingAuthtoken = dao.getAuthtokenByUserID(testUserID);
            if (existingAuthtoken != null) {
                dao.deleteAuthtoken(existingAuthtoken);
            }
        } catch (DataAccessException e) {
            // If no authtoken found, proceed with the test
        }
    }

    @Test
    void addAuthtoken() throws DataAccessException {
        // Add the authtoken
        dao.addAuthtoken(testAuthtoken);

        // Retrieve the authtoken by userID
        Authtoken retrievedAuthtoken = dao.getAuthtokenByUserID(testAuthtoken.userID());

        // Assert that the added authtoken is present
        assertNotNull(retrievedAuthtoken, "The authtoken was not added.");
        assertEquals(testAuthtoken.token(), retrievedAuthtoken.token(), "The retrieved token does not match.");
    }

    @Test
    void getAuthtokenByUserID() throws DataAccessException {
        // Add the authtoken
        dao.addAuthtoken(testAuthtoken);

        // Get the authtoken by userID
        Authtoken retrievedAuthtoken = dao.getAuthtokenByUserID(testAuthtoken.userID());

        // Assert that the correct authtoken is returned
        assertNotNull(retrievedAuthtoken, "The authtoken was not found by userID.");
        assertEquals(testAuthtoken.token(), retrievedAuthtoken.token(), "The token for the given userID does not match.");
    }

    @Test
    void getAuthtokenByToken() throws DataAccessException {
        // Add the authtoken
        dao.addAuthtoken(testAuthtoken);

        // Get the authtoken by token
        Authtoken retrievedAuthtoken = dao.getAuthtokenByToken(testAuthtoken.token());

        // Assert that the correct authtoken is returned
        assertNotNull(retrievedAuthtoken, "The authtoken was not found by token.");
        assertEquals(testAuthtoken.userID(), retrievedAuthtoken.userID(), "The userID for the given token does not match.");
    }

    @Test
    void deleteAuthtoken() throws DataAccessException {
        // Add and then delete the authtoken
        dao.addAuthtoken(testAuthtoken);
        dao.deleteAuthtoken(testAuthtoken);

        // Assert it is no longer there
        assertThrows(DataAccessException.class, () -> dao.getAuthtokenByUserID(testAuthtoken.userID()));
    }
}
