package edu.byu.pnt.dao.implementations.MongoDB;

import com.mongodb.client.MongoDatabase;

import edu.byu.pnt.dao.provider.ContactDAO;
public class MongoContactDAO extends MongoDAO implements ContactDAO {

    MongoContactDAO(MongoDatabase database) {
        super(database);
    }

    @Override
    public void getContact() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getContact'");
    }

    @Override
    public void addContact() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'addContact'");
    }

    @Override
    public void deleteContact() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'deleteContact'");
    }

    @Override
    public void updateContact() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'updateContact'");
    }
    
}
