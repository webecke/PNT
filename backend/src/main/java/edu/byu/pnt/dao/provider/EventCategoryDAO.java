package edu.byu.pnt.dao.provider;

import edu.byu.pnt.model.EventCategory;

public interface EventCategoryDAO {
    EventCategory getEventCategory();
    void addEventCategory(EventCategory eventCategory);
    void deleteEventCategory();
}