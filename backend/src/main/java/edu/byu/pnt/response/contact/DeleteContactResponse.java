package edu.byu.pnt.response.contact;

import edu.byu.pnt.response.Response;

public class DeleteContactResponse extends Response {
    public DeleteContactResponse(boolean success, String message) {
        super(success, message);
    }
}
