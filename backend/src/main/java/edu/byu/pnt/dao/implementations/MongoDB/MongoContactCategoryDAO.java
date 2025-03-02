package edu.byu.pnt.dao.implementations.MongoDB;

import com.mongodb.client.MongoDatabase;

import edu.byu.pnt.dao.provider.ContactCategoryDAO;

public class MongoContactCategoryDAO extends MongoDAO implements ContactCategoryDAO {

    MongoContactCategoryDAO(MongoDatabase database) {
        super(database);
    }

    @Override
    public void getContactCategory() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getContactCategory'");
    }

    @Override
    public void addContactCategory() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'addContactCategory'");
    }

    @Override
    public void deleteContactCategory() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'deleteContactCategory'");
    }

    @Override
    public void updateContactCategory() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'updateContactCategory'");
    }
    
}
