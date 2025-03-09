package edu.byu.pnt.response.category;

import edu.byu.pnt.response.Response;

public class DeleteCategoryResponse extends Response {
    public DeleteCategoryResponse(boolean success, String message) {
        super(success, message);
    }
}
