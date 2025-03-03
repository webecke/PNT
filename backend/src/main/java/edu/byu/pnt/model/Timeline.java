package edu.byu.pnt.model;

public class Timeline {
    private final String id;
    private final String ownerID;
    private final Event[] events;

    Timeline(String id, String ownerID, Event[] events) {
        this.id = id;
        this.ownerID = ownerID;
        this.events = events;
    }

    public String getId() {
        return id;
    }

    public String getOwnerID() {
        return ownerID;
    }

    public Event[] getEvents() {
        return events;
    }
}
