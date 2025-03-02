package edu.byu.pnt.dao.provider;

import edu.byu.pnt.dao.DataAccessException;
import edu.byu.pnt.model.Event;

public interface EventDAO {
    Event getEvent(String id) throws DataAccessException;
    void addEvent(Event event) throws DataAccessException;
    void deleteEvent();
    void updateEvent();
} 