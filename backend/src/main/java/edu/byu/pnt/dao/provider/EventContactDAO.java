package edu.byu.pnt.dao.provider;

import edu.byu.pnt.model.EventContact;

public interface EventContactDAO {
    EventContact getEventContact();
    void addEventContact(EventContact eventContact);
    void deleteEventContact();
}
