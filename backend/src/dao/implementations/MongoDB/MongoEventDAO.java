package implementations.MongoDB;

import com.mongodb.client.MongoDatabase;

import provider.EventDAO;

public class MongoEventDAO extends MongoDAO implements EventDAO{

    MongoEventDAO(MongoDatabase database) {
        super(database);
    }

    @Override
    public void getEvent() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getEvent'");
    }

    @Override
    public void addEvent() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'addEvent'");
    }

    @Override
    public void deleteEvent() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'deleteEvent'");
    }

    @Override
    public void updateEvent() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'updateEvent'");
    }
    
}
