package edu.byu.pnt.dao.factory;

import edu.byu.pnt.dao.provider.*;

public interface DAOFactory {

    // Main tables
    UserDAO createUserDAO();
    ContactDAO createContactDAO();
    EventDAO createEventDAO();
    CategoryDAO createCategoryDAO();

    // Relationship tables
    EventContactDAO createEventContactDAO();
    EventCategoryDAO createEventCategoryDAO();
    ContactCategoryDAO createContactCategoryDAO();
    AuthtokenDAO createAuthtokenDAO();

}