package edu.byu.pnt.request;

import jakarta.validation.constraints.NotBlank;

import java.util.List;

public record AddEventRequest(
        @NotBlank(message = "id must not be empty")
        String id,
        @NotBlank(message = "title must not be empty")
        String title,
        @NotBlank(message = "date must not be empty")
        String date,
        @NotBlank(message = "description must not be empty")
        String description,
        @NotBlank(message = "contacts must not be empty")
        List<String> contacts,
        @NotBlank(message = "categories must not be empty")
        List<String> categories

) { }
