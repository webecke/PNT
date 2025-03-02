package edu.byu.pnt.model;


public class User extends Person {
    private final String username;
    private final String password;

    public User(String id, String firstName, String lastName, String username, String password) {
        super(id, firstName, lastName);
        this.username = username;
        this.password = password;    // TODO hash password
    }

    public String getUsername() {
        return this.username;
    }

    public String getHashedPassword() {
        return this.password;
    }
}
