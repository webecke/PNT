package edu.byu.pnt.dao.provider;

import edu.byu.pnt.dao.DataAccessException;
import edu.byu.pnt.model.User;

public interface UserDAO {
    User getUser(String id) throws DataAccessException;
    void addUser(User user) throws DataAccessException;
    void deleteUser(String id) throws DataAccessException;
    void updateUser(String firstName, String lastName, String username, String password) throws DataAccessException;
} 
