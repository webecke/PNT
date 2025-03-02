package edu.byu.pnt.dao.factory;

import edu.byu.pnt.dao.provider.UserDAO;
import edu.byu.pnt.dao.provider.ContactDAO;
import edu.byu.pnt.dao.provider.EventDAO;
import edu.byu.pnt.dao.provider.CategoryDAO;
import edu.byu.pnt.dao.provider.EventContactDAO;
import edu.byu.pnt.dao.provider.EventCategoryDAO;
import edu.byu.pnt.dao.provider.ContactCategoryDAO;

public interface DAOFactory {

    // Main tables
    UserDAO createUserDAO();
    ContactDAO createContactDAO();
    EventDAO createEventDAO();
    CategoryDAO createCategoryDAO();
    // ImageDAO createImageDAO();   // additional feature - profile pics

    // Relationship tables
    EventContactDAO createEventContactDAO();
    EventCategoryDAO createEventCategoryDAO();
    ContactCategoryDAO createContactCategoryDAO();

}