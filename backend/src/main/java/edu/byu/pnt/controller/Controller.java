package edu.byu.pnt.controller;

import edu.byu.pnt.dao.DataAccessException;
import edu.byu.pnt.dao.factory.DAOFactory;
import edu.byu.pnt.dao.factory.FactoryProvider;
import edu.byu.pnt.dao.provider.CategoryDAO;
import edu.byu.pnt.dao.provider.ContactCategoryDAO;
import edu.byu.pnt.model.Category;
import edu.byu.pnt.model.ContactCategory;

import java.util.ArrayList;
import java.util.List;

public abstract class Controller {

    protected List<Category> getAllCategoriesByContactID(String id) throws DataAccessException {
        // Factory and DAOs
        DAOFactory factory = new FactoryProvider().getFactory();
        ContactCategoryDAO contactCategoryDAO = factory.createContactCategoryDAO();
        CategoryDAO categoryDAO = factory.createCategoryDAO();

        // Get the categories
        List<Category> categories = new ArrayList<>();
        List<ContactCategory> contactCategories = contactCategoryDAO.getContactCategoriesByContact(id);
        for (ContactCategory contactCategory : contactCategories) {
            Category category = categoryDAO.getCategory(contactCategory.categoryID());
            categories.add(category);
        }
        return categories;
    }
}
