package edu.byu.pnt.dao.mongo;

import edu.byu.pnt.dao.DataAccessException;
import edu.byu.pnt.dao.factory.DAOFactory;
import edu.byu.pnt.dao.factory.FactoryProvider;
import edu.byu.pnt.dao.implementations.MongoDB.MongoEventContact;
import edu.byu.pnt.model.EventContact;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

public class EventContactDAOTest {

    private DAOFactory factory;
    private MongoEventContact dao;

    private EventContact testEventContact;

    @BeforeEach
    void setUp() throws DataAccessException {
        // Get DAO
        factory = new FactoryProvider().getFactory();
        dao = (MongoEventContact) factory.createEventContactDAO();

        // Create test EventContact
        final String testEventID = "TEST_EVENT_ID";
        final String testContactID = "TEST_CONTACT_ID";
        testEventContact = new EventContact(testEventID, testContactID);

        // Delete testing event-contact if it exists in the database
        dao.deleteEventContact(testEventContact);
    }

    @Test
    void addEventContact() throws DataAccessException {
        // Add the event contact
        dao.addEventContact(testEventContact);

        // Retrieve the event contacts by eventID
        List<EventContact> eventContacts = dao.getEventContactsByEventID(testEventContact.eventID());

        // Assert the event contact was added successfully
        assertNotNull(eventContacts, "Event contacts should exist after being added.");
        assertEquals(1, eventContacts.size(), "There should be exactly 1 event contact for the event.");
        assertEquals(testEventContact.eventID(), eventContacts.get(0).eventID(), "Event ID mismatch.");
        assertEquals(testEventContact.contactID(), eventContacts.get(0).contactID(), "Contact ID mismatch.");
    }

    @Test
    void getEventContactsByEventID() throws DataAccessException {
        // Add the event contact
        dao.addEventContact(testEventContact);

        // Retrieve the event contacts by eventID
        List<EventContact> eventContacts = dao.getEventContactsByEventID(testEventContact.eventID());

        // Assert the event contact is correctly retrieved by eventID
        assertNotNull(eventContacts, "Event contacts should exist for the given event ID.");
        assertEquals(1, eventContacts.size(), "There should be exactly 1 event contact for the event.");
        assertEquals(testEventContact.eventID(), eventContacts.get(0).eventID(), "Event ID mismatch.");
        assertEquals(testEventContact.contactID(), eventContacts.get(0).contactID(), "Contact ID mismatch.");
    }

    @Test
    void getEventContactsByContactID() throws DataAccessException {
        // Add the event contact
        dao.addEventContact(testEventContact);

        // Retrieve the event contacts by contactID
        List<EventContact> eventContacts = dao.getEventContactsByContactID(testEventContact.contactID());

        // Assert the event contact is correctly retrieved by contactID
        assertNotNull(eventContacts, "Event contacts should exist for the given contact ID.");
        assertEquals(1, eventContacts.size(), "There should be exactly 1 event contact for the contact.");
        assertEquals(testEventContact.eventID(), eventContacts.get(0).eventID(), "Event ID mismatch.");
        assertEquals(testEventContact.contactID(), eventContacts.get(0).contactID(), "Contact ID mismatch.");
    }

    @Test
    void deleteEventContact() throws DataAccessException {
        // Add the event contact
        dao.addEventContact(testEventContact);

        // Delete the event contact
        dao.deleteEventContact(testEventContact);

        // Attempt to retrieve the event contact by eventID
        List<EventContact> eventContacts = dao.getEventContactsByEventID(testEventContact.eventID());

        // Assert the event contact is deleted
        assertTrue(eventContacts.isEmpty(), "The event contact should be deleted and not found.");
    }

    @Test
    void deleteNonExistentEventContact() throws DataAccessException {
        // Try deleting a non-existent event contact
        dao.deleteEventContact(testEventContact);

        // Attempt to retrieve the event contact by eventID
        List<EventContact> eventContacts = dao.getEventContactsByEventID(testEventContact.eventID());

        // Assert the event contact is still not found
        assertTrue(eventContacts.isEmpty(), "The event contact should still not be found.");
    }
}
