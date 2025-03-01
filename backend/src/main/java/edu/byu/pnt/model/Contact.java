package edu.byu.pnt.model;

public class Contact extends Person {
    private Category[] categories;
    private String email;
    private String phone;
    private String note;

    Contact(String id, String name, Category[] categories, String email, String phone, String note) {
        super(id, name);
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
