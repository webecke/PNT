package edu.byu.pnt.controller;

import edu.byu.pnt.request.AddCategoryRequest;
import edu.byu.pnt.request.UpdateCategoryRequest;
import edu.byu.pnt.response.category.AddCategoryResponse;
import edu.byu.pnt.response.category.DeleteCategoryResponse;
import edu.byu.pnt.response.category.GetCategoryResponse;
import edu.byu.pnt.response.category.UpdateCategoryResponse;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/category")
public class CategoryController {

    @GetMapping("/{id}")
    public GetCategoryResponse getCategory(@PathVariable String id) {
        return new GetCategoryResponse(false, "Not implemented yet");
    }

    @DeleteMapping("/{id}")
    public DeleteCategoryResponse deleteCategory(@PathVariable String id) {
        return new DeleteCategoryResponse(false, "Not implemented yet");
    }

    @PostMapping("/add")
    public AddCategoryResponse addCategory(@Valid @RequestBody AddCategoryRequest request) {
        return new AddCategoryResponse(false, "Not implemented yet");
    }

    @PostMapping("/update")
    public UpdateCategoryResponse updateCategory(@Valid @RequestBody UpdateCategoryRequest request) {
        return new UpdateCategoryResponse(false, "Not implemented yet");
    }
}
