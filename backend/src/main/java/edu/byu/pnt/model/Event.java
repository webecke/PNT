package edu.byu.pnt.model;

import java.util.Date;
import java.util.List;

public class Event {
    private final String id;
    private final String title;
    private final String date;
    private final String description;
    private final List<String> contacts;
    private final List<String> categories;

    public Event(String id, String title, String date, String description, List<String> contacts, List<String> categories) {
        this.id = id;
        this.title = title;
        this.date = date;
        this.description = description;
        this.contacts = contacts;
        this.categories = categories;
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

    public List<String> getContacts() {
        return contacts;
    }

    public List<String> getCategories() {
        return categories;
    }
}
