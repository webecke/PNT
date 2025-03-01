package edu.byu.pnt.model;


public abstract class Person {
    private String id;
    private String name;

    Person(String id, String name) {
        this.id = id;
        this.name = name;
    }

    public String getID() {
        return this.id;
    }

    public String getName() {
        return this.name;
    }
}
