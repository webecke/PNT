package edu.byu.pnt.dao.provider;

import edu.byu.pnt.model.ContactCategory;

public interface ContactCategoryDAO {
    ContactCategory getContactCategory();
    void addContactCategory(ContactCategory contactCategory);
    void deleteContactCategory();
}
