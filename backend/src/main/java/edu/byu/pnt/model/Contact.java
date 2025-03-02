package edu.byu.pnt.model;

public class Contact extends Person {
    private final Category[] categories;
    private final String email;
    private final String phone;
    private final String note;

    Contact(String id, String firstName, String lastName, Category[] categories, String email, String phone, String note) {
        super(id, firstName, lastName);
        this.categories = categories;
        this.email = email;
        this.phone = phone;
        this.note = note;
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
