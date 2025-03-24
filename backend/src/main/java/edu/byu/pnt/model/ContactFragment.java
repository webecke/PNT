package edu.byu.pnt.model;

public class ContactFragment extends Person {
    private final String id;
    private final String email;
    private final String phone;
    private final String note;

    public ContactFragment(String id, String firstName, String lastName, String email, String phone, String note) {
        super(firstName, lastName);
        this.id = id;
        this.email = email;
        this.phone = phone;
        this.note = note;
    }

    public String getID() {
        return id;
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
