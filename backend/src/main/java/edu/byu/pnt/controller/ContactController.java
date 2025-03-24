package edu.byu.pnt.controller;

import edu.byu.pnt.dao.DataAccessException;
import edu.byu.pnt.dao.factory.DAOFactory;
import edu.byu.pnt.dao.factory.FactoryProvider;
import edu.byu.pnt.dao.provider.CategoryDAO;
import edu.byu.pnt.dao.provider.ContactCategoryDAO;
import edu.byu.pnt.dao.provider.ContactDAO;
import edu.byu.pnt.model.Category;
import edu.byu.pnt.model.Contact;
import edu.byu.pnt.model.ContactCategory;
import edu.byu.pnt.model.ContactFragment;
import edu.byu.pnt.request.AddContactRequest;
import edu.byu.pnt.request.UpdateContactRequest;
import edu.byu.pnt.response.contact.AddContactResponse;
import edu.byu.pnt.response.contact.DeleteContactResponse;
import edu.byu.pnt.response.contact.GetContactResponse;
import edu.byu.pnt.response.contact.UpdateContactResponse;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/contact")
public class ContactController extends Controller {

    @GetMapping("/{id}")
    public GetContactResponse getContact(
            @RequestHeader("Authorization") String token,
            @PathVariable String id) {
        try {
            // Authenticate token
            this.authenticate(token);

            // Create factory and DAO classes
            DAOFactory factory = new FactoryProvider().getFactory();
            ContactDAO contactDAO = factory.createContactDAO();
            ContactCategoryDAO contactCategoryDAO = factory.createContactCategoryDAO();
            CategoryDAO categoryDAO = factory.createCategoryDAO();

            // Extract categories for contact
            List<Category> categories = new ArrayList<>();
            List<ContactCategory> contactCategories = contactCategoryDAO.getContactCategoriesByContact(id);
            for (ContactCategory contactCategory : contactCategories) {
                Category category = categoryDAO.getCategory(contactCategory.categoryID());
                categories.add(category);
            }

            // Assemble the contact and return
            ContactFragment fragment = contactDAO.getContactFragment(id);
            Contact contact = new Contact(fragment.getID(), fragment.getFirstName(), fragment.getLastName(), categories, fragment.getEmail(), fragment.getPhone(), fragment.getNote());
            return new GetContactResponse(true, null, contact);
        } catch (
        DataAccessException e) {
            return new GetContactResponse(false, e.getMessage(), null);
        }
    }

    @DeleteMapping("/{id}")
    public DeleteContactResponse deleteContact(
            @RequestHeader("Authorization") String token,
            @PathVariable String id) {
        try {
            // Authenticate token
            this.authenticate(token);

            // Create factory and DAO class
            DAOFactory factory = new FactoryProvider().getFactory();
            ContactDAO contactDAO = factory.createContactDAO();

            // Delete the contact
            contactDAO.deleteContactFragment(id);
            return new DeleteContactResponse(true, null);

        } catch (DataAccessException e) {
            return new DeleteContactResponse(false, e.getMessage());
        }
    }

    @PostMapping("/add")
    public AddContactResponse addContact(
            @RequestHeader("Authorization") String token,
            @Valid @RequestBody AddContactRequest request) {
        try {
            // Authenticate token
            this.authenticate(token);

            // Create factory and DAO class
            DAOFactory factory = new FactoryProvider().getFactory();
            ContactDAO contactDAO = factory.createContactDAO();

            // Generate id and add the contact
            String id = UUID.randomUUID().toString();
            ContactFragment contactFragment = new ContactFragment(id, request.firstName(), request.lastName(), request.email(), request.phone(), request.note());
            contactDAO.addContactFragment(contactFragment);

            return new AddContactResponse(true, null);
        } catch (DataAccessException e) {
            return new AddContactResponse(false, e.getMessage());
        }
    }

    @PostMapping("/update")
    public UpdateContactResponse updateContact(
            @RequestHeader("Authorization") String token,
            @Valid @RequestBody UpdateContactRequest request) {
        try {
            // Authenticate token
            this.authenticate(token);

            // Create factory and DAO class
            DAOFactory factory = new FactoryProvider().getFactory();
            ContactDAO contactDAO = factory.createContactDAO();

            // Update the contact
            contactDAO.updateContactFragment(request.id(), request.firstName(), request.lastName(), request.email(), request.phone(), request.note());

            return new UpdateContactResponse(true, null);
        } catch (DataAccessException e) {
            return new UpdateContactResponse(false, e.getMessage());
        }
    }
}
