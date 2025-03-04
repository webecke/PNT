package edu.byu.pnt.dao.implementations.MongoDB;

import com.mongodb.client.MongoDatabase;

import edu.byu.pnt.dao.DataAccessException;
import edu.byu.pnt.dao.provider.CategoryDAO;
import edu.byu.pnt.model.Category;

public class MongoCategoryDAO extends MongoDAO implements CategoryDAO {

    MongoCategoryDAO(MongoDatabase database) {
        super(database);
    }

    public Category getCategory(String id)  throws DataAccessException{
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getCategory'");
    }

    public void addCategory(Category category) throws DataAccessException {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'addCategory'");
    }

    public void deleteCategory(String id) throws DataAccessException {
        this.deleteDocument("categories", id);
    }

    public void updateCategory() throws DataAccessException {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'updateCategory'");
    }
    
}
