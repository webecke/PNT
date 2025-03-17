package edu.byu.pnt.model;

import java.util.List;

public class Contact extends Person {
    private final String id;
    private final List<Category> categories;
    private final String email;
    private final String phone;
    private final String note;

    public Contact(String id, String firstName, String lastName, List<Category> categories, String email, String phone, String note) {
        super(firstName, lastName);
        this.id = id;
        this.categories = categories;
        this.email = email;
        this.phone = phone;
        this.note = note;
    }

    public String getId() {
        return id;
    }

    public List<Category> getCategories() {
        return categories;
    }

    public String getEmail() {
        return this.email;
    }

    public String getPhone() {
        return this.phone;
    }

    public String getNote() {
        return this.note;
    }
}
