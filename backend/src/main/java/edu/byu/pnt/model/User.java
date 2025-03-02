package edu.byu.pnt.model;


public class User extends Person {
    private String username;
    private String hashed_password;

    public User(String id, String name, String username, String password) {
        super(id, name);
        this.username = username;
        this.hashed_password = password;    // TODO hash password
    }

    public String getUsername() {
        return this.username;
    }

    public String getHashedPassword() {
        return this.hashed_password;
    }
}
