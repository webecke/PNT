package edu.byu.pnt.dao.implementations.MongoDB;

import com.mongodb.client.MongoDatabase;

import edu.byu.pnt.dao.provider.EventContactDAO;
import edu.byu.pnt.model.EventContact;

public class MongoEventContact extends MongoDAO implements EventContactDAO {

    protected MongoEventContact(MongoDatabase database) {
        super(database);
    }

    @Override
    public EventContact getEventContact() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getEventContact'");
    }

    @Override
    public void addEventContact(EventContact eventContact) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'addEventContact'");
    }

    @Override
    public void deleteEventContact() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'deleteEventContact'");
    }
}
