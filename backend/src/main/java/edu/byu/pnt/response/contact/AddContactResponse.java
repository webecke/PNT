package edu.byu.pnt.response.contact;

import edu.byu.pnt.response.Response;

public class AddContactResponse extends Response {
    String contactId;
    public AddContactResponse(boolean success, String message, String contactId) {
        super(success, message);
        this.contactId = contactId;
    }
    public String getContactId() {
        return contactId;
    }

    public void setContactId(String contactID) {
        this.contactId = contactID;
    }

}
