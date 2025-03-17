package edu.byu.pnt.response.contact;

import com.fasterxml.jackson.annotation.JsonProperty;
import edu.byu.pnt.model.Contact;
import edu.byu.pnt.response.Response;

public class GetContactResponse extends Response {

    private Contact contact;
    public GetContactResponse(boolean success, String message, Contact contact) {
        super(success, message);
        this.contact = contact;
    }

    @JsonProperty("contact")

    public Contact getContact() {
        return contact;
    }
}
