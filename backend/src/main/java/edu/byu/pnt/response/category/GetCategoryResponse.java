package edu.byu.pnt.response.category;

import com.fasterxml.jackson.annotation.JsonProperty;
import edu.byu.pnt.model.Category;
import edu.byu.pnt.response.Response;

public class GetCategoryResponse extends Response {

    private final Category category;
    public GetCategoryResponse(boolean success, String message, Category category) {
        super(success, message);
        this.category = category;
    }

    @JsonProperty("category")
    public Category getCategory() {
        return category;
    }
}
