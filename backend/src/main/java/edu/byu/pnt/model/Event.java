package edu.byu.pnt.model;

import java.util.Date;

public class Event {
    private String id;
    private String name;
    private Date date;
    private String description;
    private Contact[] contacts;
    private Category[] categories;

    public Event(String id, String name, Date date, String description, Contact[] contacts, Category[] categories) {
        this.id = id;
        this.name = name;
        this.date = date;
        this.description = description;
        this.contacts = contacts;
        this.categories = categories;
    }

    public String getID() {
        return id;
    }

    public String getName() {
        return name;
    }

    public Date getDate() {
        return date;
    }

    public String getDescription() {
        return description;
    }

    public Contact[] getContacts() {
        return contacts;
    }

    public Category[] getCategories() {
        return categories;
    }
}
