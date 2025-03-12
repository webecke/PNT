package edu.byu.pnt.dao.provider;

import edu.byu.pnt.dao.DataAccessException;
import edu.byu.pnt.model.ContactFragment;

public interface ContactDAO {
    ContactFragment getContactFragment(String id) throws DataAccessException;
    void addContactFragment(ContactFragment contactFragment) throws DataAccessException;
    void deleteContactFragment(String id) throws DataAccessException;
    void updateContactFragment(String id, String firstName, String lastName, String email, String phone, String note) throws DataAccessException;
}
