package edu.byu.pnt.dao.mongo;

import edu.byu.pnt.dao.DataAccessException;
import edu.byu.pnt.dao.factory.DAOFactory;
import edu.byu.pnt.dao.factory.FactoryProvider;
import edu.byu.pnt.dao.provider.ContactDAO;
import edu.byu.pnt.model.ContactFragment;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;
public class ContactDAOTest {

    private DAOFactory factory;
    private ContactDAO dao;

    private ContactFragment testContact;

    @BeforeEach
    void setUp() throws DataAccessException {
        // Get DAO
        factory = new FactoryProvider().getFactory();
        dao = factory.createContactDAO();

        // Create test contact fragment
        final String testID = "TESTING_ID";
        final String firstName = "TESTING_FIRST_NAME";
        final String lastName = "TESTING_LAST_NAME";
        final String email = "TESTING_EMAIL@GMAIL.COM";
        final String phone = "(123)456-7890";
        final String note = "TESTING_NOTE";
        testContact = new ContactFragment(testID, firstName, lastName, email, phone, note);

        // Delete testing contact if in database
        dao.deleteContactFragment(testContact.getID());
    }

    @Test
    void addContactFragment() throws DataAccessException {
        // Add and then get the fragment
        dao.addContactFragment(testContact);
        ContactFragment contactFragment = dao.getContactFragment(testContact.getID());

        // Assert values are unchanged
        assertEquals(contactFragment.getID(), testContact.getID(), "ID changed after being added.");
        assertEquals(contactFragment.getFirstName(), testContact.getFirstName(), "First name changed after being added.");
        assertEquals(contactFragment.getLastName(), testContact.getLastName(), "Last name changed after being added.");
        assertEquals(contactFragment.getEmail(), testContact.getEmail(), "Email changed after being added.");
        assertEquals(contactFragment.getPhone(), testContact.getPhone(), "Phone changed after being added.");
        assertEquals(contactFragment.getNote(), testContact.getNote(), "Note changed after being added.");
    }
    @Test
    void getContactFragment() throws DataAccessException {
        // Add and then get the fragment
        dao.addContactFragment(testContact);
        ContactFragment contactFragment = dao.getContactFragment(testContact.getID());

        // Assert values are unchanged
        assertEquals(contactFragment.getID(), testContact.getID(), "ID changed after get.");
        assertEquals(contactFragment.getFirstName(), testContact.getFirstName(), "First name changed after get.");
        assertEquals(contactFragment.getLastName(), testContact.getLastName(), "Last name changed after get.");
        assertEquals(contactFragment.getEmail(), testContact.getEmail(), "Email changed after get.");
        assertEquals(contactFragment.getPhone(), testContact.getPhone(), "Phone changed after get.");
        assertEquals(contactFragment.getNote(), testContact.getNote(), "Note changed after get.");
    }
    @Test
    void deleteContactFragment() throws DataAccessException {
        // Add and then delete contact fragment
        dao.addContactFragment(testContact);
        dao.deleteContactFragment(testContact.getID());

        // Assert retrieval fails
        assertThrows(DataAccessException.class, () -> dao.getContactFragment(testContact.getID()));
    }
    @Test
    void updateContactFragment() throws DataAccessException {
        // Updated testing values
        String updateFirstName = "UPDATED_FIRST_NAME";
        String updatedLastName = "UPDATED_LAST_NAME";
        String updatedEmail = "UPDATED_EMAIL";
        String updatedPhone = "(098)765-4321";
        String updatedNote = "UPDATED_NOTE";

        // Add contact fragment, update it, then retrieve it
        dao.addContactFragment(testContact);
        dao.updateContactFragment(testContact.getID(), updateFirstName, updatedLastName, updatedEmail, updatedPhone, updatedNote);
        ContactFragment updatedContact = dao.getContactFragment(testContact.getID());

        // Assert values were updated
        assertEquals(updatedContact.getID(), testContact.getID(), "ID changed after update.");
        assertEquals(updatedContact.getFirstName(), updateFirstName, "First name not updated");
        assertEquals(updatedContact.getLastName(), updatedLastName, "Last name not updated");
        assertEquals(updatedContact.getEmail(), updatedEmail, "Email not updated");
        assertEquals(updatedContact.getPhone(), updatedPhone, "Phone not updated");
        assertEquals(updatedContact.getNote(), updatedNote, "Note not updated");
    }
}
