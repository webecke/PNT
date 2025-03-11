package edu.byu.pnt.dao.mongo;

import edu.byu.pnt.dao.DataAccessException;
import edu.byu.pnt.dao.factory.DAOFactory;
import edu.byu.pnt.dao.factory.FactoryProvider;
import edu.byu.pnt.dao.provider.ContactCategoryDAO;
import edu.byu.pnt.model.ContactCategory;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

public class ContactCategoryDAOTest {

    private DAOFactory factory;
    private ContactCategoryDAO dao;

    private ContactCategory testContactCategory;

    @BeforeEach
    void setUp() throws DataAccessException {
        // Get DAO
        factory = new FactoryProvider().getFactory();
        dao = factory.createContactCategoryDAO();

        // Create test contact-category relationship
        final String testContactID = "TEST_CONTACT_ID";
        final String testCategoryID = "TEST_CATEGORY_ID";
        testContactCategory = new ContactCategory(testContactID, testCategoryID);

        // Delete testing contact-category relationship if exists in the database
        List<ContactCategory> existingCategories = dao.getContactCategoriesByContact(testContactID);
        for (ContactCategory contactCategory : existingCategories) {
            if (contactCategory.categoryID().equals(testCategoryID)) {
                dao.deleteContactCategory(contactCategory);
            }
        }
    }

    @Test
    void addContactCategory() throws DataAccessException {
        // Add the contact-category relationship
        dao.addContactCategory(testContactCategory);

        // Retrieve the contact categories for the contactID
        List<ContactCategory> contactCategories = dao.getContactCategoriesByContact(testContactCategory.contactID());

        // Assert that the added contact-category relationship is present
        assertTrue(contactCategories.stream()
                        .anyMatch(category -> category.categoryID().equals(testContactCategory.categoryID())),
                "The contact-category relationship was not added.");
    }

    @Test
    void getContactCategoriesByContact() throws DataAccessException {
        // Add the contact-category relationship
        dao.addContactCategory(testContactCategory);

        // Get contact categories by contact ID
        List<ContactCategory> contactCategories = dao.getContactCategoriesByContact(testContactCategory.contactID());

        // Assert that the correct contact category is returned
        assertTrue(contactCategories.stream()
                        .anyMatch(category -> category.categoryID().equals(testContactCategory.categoryID())),
                "The contact-category relationship was not found.");
    }

    @Test
    void getContactCategoriesByCategory() throws DataAccessException {
        // Add the contact-category relationship
        dao.addContactCategory(testContactCategory);

        // Get contact categories by category ID
        List<ContactCategory> contactCategories = dao.getContactCategoriesByCategory(testContactCategory.categoryID());

        // Assert that the correct contact category is returned
        assertTrue(contactCategories.stream()
                        .anyMatch(category -> category.contactID().equals(testContactCategory.contactID())),
                "The contact-category relationship was not found by category.");
    }

    @Test
    void deleteContactCategory() throws DataAccessException {
        // Add and then delete the contact-category relationship
        dao.addContactCategory(testContactCategory);
        dao.deleteContactCategory(testContactCategory);

        // Get contact categories for the contactID and assert it's deleted
        List<ContactCategory> contactCategories = dao.getContactCategoriesByContact(testContactCategory.contactID());
        assertFalse(contactCategories.stream()
                        .anyMatch(category -> category.categoryID().equals(testContactCategory.categoryID())),
                "The contact-category relationship was not deleted.");
    }
}
