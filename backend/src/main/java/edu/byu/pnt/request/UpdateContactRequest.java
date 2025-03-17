package edu.byu.pnt.request;

public record UpdateContactRequest(String id, String firstName, String lastName, String email, String phone, String note) {
}
