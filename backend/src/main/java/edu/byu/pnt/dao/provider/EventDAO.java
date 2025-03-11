package edu.byu.pnt.dao.provider;

import edu.byu.pnt.dao.DataAccessException;
import edu.byu.pnt.model.EventFragment;

public interface EventDAO {
    EventFragment getEventFragment(String id) throws DataAccessException;
    void addEventFragment(EventFragment event) throws DataAccessException;
    void deleteEventFragment(String id) throws DataAccessException;
    void updateEventFragment(String id, String title, String date, String description) throws DataAccessException;
} 