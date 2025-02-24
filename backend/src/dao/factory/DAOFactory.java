package factory;

import provider.UserDAO;
import provider.ContactDAO;
import provider.EventDAO;
import provider.CategoryDAO;
import provider.EventContactDAO;
import provider.EventCategoryDAO;
import provider.ContactCategoryDAO;

public interface DAOFactory {

    // Main tables
    UserDAO createUserDAO();
    ContactDAO createContactDAO();
    EventDAO createEventDAO();
    CategoryDAO createCategoryDAO();
    // IamgeDAO createImageDAO();   // additional feature - profile pics

    // Relationship tables
    EventContactDAO createEventContactDAO();
    EventCategoryDAO createEventCategoryDAO();
    ContactCategoryDAO createContactCategoryDAO();

}