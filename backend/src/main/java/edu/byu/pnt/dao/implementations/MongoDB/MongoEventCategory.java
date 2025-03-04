package edu.byu.pnt.dao.implementations.MongoDB;

import com.mongodb.client.MongoDatabase;

import edu.byu.pnt.dao.provider.EventCategoryDAO;
import edu.byu.pnt.model.EventCategory;

public class MongoEventCategory extends MongoDAO implements EventCategoryDAO {

    protected MongoEventCategory(MongoDatabase database) {
        super(database);
    }

    @Override
    public EventCategory getEventCategory() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getEventCategory'");
    }

    @Override
    public void addEventCategory(EventCategory eventCategory) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'addEventCategory'");
    }

    @Override
    public void deleteEventCategory() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'deleteEventCategory'");
    }
}
