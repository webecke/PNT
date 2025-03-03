package edu.byu.pnt.model;


public class Category {
    private final String id;
    private final String label;

    public Category(String id, String label) {
        this.id = id;
        this.label = label;
    }

    public String getID() {
        return this.id;
    }

    public String getLabel() {
        return this.label;
    }
}
