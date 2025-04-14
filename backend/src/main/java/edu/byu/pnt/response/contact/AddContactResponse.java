package edu.byu.pnt.response.contact;

import edu.byu.pnt.response.Response;

public class AddContactResponse extends Response {
    String contactID;
    public AddContactResponse(boolean success, String message, String contactID) {
        super(success, message);
        this.contactID = contactID;
    }
    public String getContactID() {
        return contactID;
    }

    public void setContactID(String contactID) {
        this.contactID = contactID;
    }

}
