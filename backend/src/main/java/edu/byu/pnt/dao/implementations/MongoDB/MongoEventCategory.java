package edu.byu.pnt.dao.implementations.MongoDB;

import com.mongodb.client.MongoDatabase;

import edu.byu.pnt.dao.provider.EventCategoryDAO;

public class MongoEventCategory extends MongoDAO implements EventCategoryDAO {

    protected MongoEventCategory(MongoDatabase database) {
        super(database);
    }

    @Override
    public void getEventCategory() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getEventCategory'");
    }

    @Override
    public void addEventCategory() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'addEventCategory'");
    }

    @Override
    public void deleteEventCategory() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'deleteEventCategory'");
    }

    @Override
    public void updateEventCategory() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'updateEventCategory'");
    }
    
}
