package edu.byu.pnt.dao.provider;

import edu.byu.pnt.dao.DataAccessException;
import edu.byu.pnt.model.EventContact;

import java.util.List;

public interface EventContactDAO {
    List<EventContact> getEventContactsByEventID(String eventID) throws DataAccessException;
    List<EventContact> getEventContactsByContactID(String contactID) throws DataAccessException;
    void addEventContact(EventContact eventContact) throws DataAccessException;
    void deleteEventContact(EventContact eventContact) throws DataAccessException;
}
