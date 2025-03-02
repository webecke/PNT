package edu.byu.pnt.dao.provider;

import edu.byu.pnt.dao.DataAccessException;

public interface UserDAO {
    void getUser(String id);
    void addUser(String id, String name, String username, String password) throws DataAccessException;
    void deleteUser();
    void updateUser();
    void login();
    void logout();
} 
