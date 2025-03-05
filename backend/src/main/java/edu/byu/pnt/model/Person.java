package edu.byu.pnt.model;


public abstract class Person {
    private final String id;
    private final String firstName;
    private final String lastName;

    Person(String id, String firstName, String lastName) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    public String getID() {
        return this.id;
    }

    public String getFirstName() {
        return this.firstName;
    }

    public String getLastName() {
        return lastName;
    }
}
