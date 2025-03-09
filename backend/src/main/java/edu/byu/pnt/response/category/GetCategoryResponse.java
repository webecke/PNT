package edu.byu.pnt.response.category;

import edu.byu.pnt.response.Response;

public class GetCategoryResponse extends Response {
    public GetCategoryResponse(boolean success, String message) {
        super(success, message);
    }
}
