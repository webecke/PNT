package edu.byu.pnt.dao.provider;

import edu.byu.pnt.dao.DataAccessException;
import edu.byu.pnt.model.Category;

public interface CategoryDAO {
    Category getCategory(String id) throws DataAccessException;
    void addCategory(Category category) throws DataAccessException;
    void deleteCategory(String id) throws DataAccessException;
    void updateCategory(String id, String newLabel) throws DataAccessException;
}
