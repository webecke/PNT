package edu.byu.pnt.model;

public class Authtoken {
    private final String token;

    private final String userID;

    public Authtoken(String token, String userID) {
        this.token = token;
        this.userID = userID;
    }

    public String getToken() {
        return token;
    }

    public String getUserID() {
        return userID;
    }
}
