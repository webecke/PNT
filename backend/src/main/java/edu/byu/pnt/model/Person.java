package edu.byu.pnt.model;


public abstract class Person {
    private final String firstName;
    private final String lastName;

    Person(String firstName, String lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }

    public String getFirstName() {
        return this.firstName;
    }

    public String getLastName() {
        return lastName;
    }
}
