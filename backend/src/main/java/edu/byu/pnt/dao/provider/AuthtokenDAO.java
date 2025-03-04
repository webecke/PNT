package edu.byu.pnt.dao.provider;

import edu.byu.pnt.dao.DataAccessException;
import edu.byu.pnt.model.Authtoken;

public interface AuthtokenDAO {
    Authtoken getAuthtoken(String userID) throws DataAccessException;
    void addAuthtoken(Authtoken authtoken) throws DataAccessException;
    void deleteAuthtoken(String userID) throws DataAccessException; // TODO what should be the unique id of authtokens?
}
