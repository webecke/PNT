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
import edu.byu.pnt.request.AddCategoryRequest;
import edu.byu.pnt.request.UpdateCategoryRequest;
import edu.byu.pnt.response.category.AddCategoryResponse;
import edu.byu.pnt.response.category.DeleteCategoryResponse;
import edu.byu.pnt.response.category.GetCategoryResponse;
import edu.byu.pnt.response.category.UpdateCategoryResponse;
import edu.byu.pnt.response.contact.GetContactResponse;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/category")
public class CategoryController extends Controller {

    @GetMapping("/{id}")
    public GetCategoryResponse getCategory(
            @RequestHeader("Authorization") String token,
            @PathVariable String id) {
        try {
            // Authenticate token
            this.authenticate(token);

            // Create factory and DAO classes
            DAOFactory factory = new FactoryProvider().getFactory();
            CategoryDAO categoryDAO = factory.createCategoryDAO();

            // Get the category
            Category category = categoryDAO.getCategory(id);

            return new GetCategoryResponse(true, null, category);
        } catch (DataAccessException e) {
            return new GetCategoryResponse(false, e.getMessage(), null);
        }
    }

    @DeleteMapping("/{id}")
    public DeleteCategoryResponse deleteCategory(
            @RequestHeader("Authorization") String token,
            @PathVariable String id) {
        try {
            // Authenticate token
            this.authenticate(token);

            // Create factory and DAO classes
            DAOFactory factory = new FactoryProvider().getFactory();
            CategoryDAO categoryDAO = factory.createCategoryDAO();

            // Delete the category
            categoryDAO.deleteCategory(id);

            return new DeleteCategoryResponse(true, null);
        } catch (DataAccessException e) {
            return new DeleteCategoryResponse(false, e.getMessage());
        }
    }

    @PostMapping("/add")
    public AddCategoryResponse addCategory(
            @RequestHeader("Authorization") String token,
            @Valid @RequestBody AddCategoryRequest request) {
        try {
            // Authenticate token
            this.authenticate(token);

            // Create factory and DAO classes
            DAOFactory factory = new FactoryProvider().getFactory();
            CategoryDAO categoryDAO = factory.createCategoryDAO();

            // Delete the category
            String id = UUID.randomUUID().toString();
            Category category = new Category(id, request.label());
            categoryDAO.addCategory(category);

            return new AddCategoryResponse(true, null);
        } catch (DataAccessException e) {
            return new AddCategoryResponse(false, e.getMessage());
        }
    }

    @PostMapping("/update")
    public UpdateCategoryResponse updateCategory(
            @RequestHeader("Authorization") String token,
            @Valid @RequestBody UpdateCategoryRequest request) {
        try {
            // Authenticate token
            this.authenticate(token);

            // Create factory and DAO classes
            DAOFactory factory = new FactoryProvider().getFactory();
            CategoryDAO categoryDAO = factory.createCategoryDAO();

            // Update the category
            categoryDAO.updateCategory(request.id(), request.label());

            return new UpdateCategoryResponse(true, null);
        } catch (DataAccessException e) {
            return new UpdateCategoryResponse(false, e.getMessage());
        }
    }
}
