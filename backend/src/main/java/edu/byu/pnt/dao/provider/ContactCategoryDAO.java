package edu.byu.pnt.dao.provider;

import edu.byu.pnt.dao.DataAccessException;
import edu.byu.pnt.model.ContactCategory;

import java.util.List;

public interface ContactCategoryDAO {
    List<ContactCategory> getContactCategoriesByContact(String contactID) throws DataAccessException;
    List<ContactCategory> getContactCategoriesByCategory(String categoryID) throws DataAccessException;
    void addContactCategory(ContactCategory contactCategory) throws DataAccessException;
    void deleteContactCategory(ContactCategory contactCategory) throws DataAccessException;
}
