package edu.byu.pnt.model;

public class EventFragment {
    private final String id;
    private final String title;
    private final String date;
    private final String description;

    public EventFragment(String id, String title, String date, String description) {
        this.id = id;
        this.title = title;
        this.date = date;
        this.description = description;
    }

    public String getID() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getDate() {
        return date;
    }

    public String getDescription() {
        return description;
    }
}
