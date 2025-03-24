package edu.byu.pnt.request;

import jakarta.validation.constraints.NotBlank;

public record AddCategoryRequest(@NotBlank(message = "label must not be empty") String label) {
}
