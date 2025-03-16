package edu.byu.pnt.dao.provider;

import edu.byu.pnt.dao.DataAccessException;
import edu.byu.pnt.model.Authtoken;

public interface AuthtokenDAO {
    Authtoken getAuthtokenByUserID(String userID) throws DataAccessException;
    Authtoken getAuthtokenByToken(String token) throws DataAccessException;
    void addAuthtoken(Authtoken authtoken) throws DataAccessException;
    void deleteAuthtoken(Authtoken authtoken) throws DataAccessException;
}
