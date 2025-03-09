package edu.byu.pnt.response.contact;

import edu.byu.pnt.response.Response;

public class GetContactResponse extends Response {
    public GetContactResponse(boolean success, String message) {
        super(success, message);
    }
}
