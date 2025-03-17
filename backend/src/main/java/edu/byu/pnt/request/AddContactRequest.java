package edu.byu.pnt.request;

public record AddContactRequest(String firstName, String lastName, String email, String phone, String note) {
}
