package edu.byu.pnt.dao.provider;

import edu.byu.pnt.dao.DataAccessException;
import edu.byu.pnt.model.EventCategory;

import java.util.List;

public interface EventCategoryDAO {
    public List<EventCategory> getEventCategoriesByCategory(String categoryID) throws DataAccessException;
    public List<EventCategory> getEventCategoriesByEvent(String eventID) throws DataAccessException;
    void addEventCategory(EventCategory eventCategory)  throws DataAccessException ;
    void deleteEventCategory(EventCategory eventCategory) throws DataAccessException;
}