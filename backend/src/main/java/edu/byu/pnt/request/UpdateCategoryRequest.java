package edu.byu.pnt.request;

import jakarta.validation.constraints.NotBlank;

public record UpdateCategoryRequest(@NotBlank(message = "id must not be blank") String id, @NotBlank(message = "label must not be blank") String label) {
}
