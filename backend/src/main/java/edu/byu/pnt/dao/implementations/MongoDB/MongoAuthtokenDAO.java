package edu.byu.pnt.dao.implementations.MongoDB;

import com.mongodb.client.MongoDatabase;
import edu.byu.pnt.dao.DataAccessException;
import edu.byu.pnt.dao.provider.AuthtokenDAO;
import edu.byu.pnt.dao.provider.CategoryDAO;
import edu.byu.pnt.model.Authtoken;

public class MongoAuthtokenDAO extends MongoDAO implements AuthtokenDAO {

    MongoAuthtokenDAO(MongoDatabase database) {
        super(database);
    }

    public Authtoken getAuthtoken(String userID) throws DataAccessException {
        // TODO implement getAuthtoken
        return null;
    }

    public void addAuthtoken(Authtoken authtoken) throws DataAccessException {
        // TODO implement addAuthtoken
    }

    public void deleteAuthtoken(String userID) throws DataAccessException {
        // TODO implement deleteAuthtoken
    }
}
