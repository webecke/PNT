package edu.byu.pnt.request;

import jakarta.validation.constraints.NotBlank;

import java.util.List;

public record AddEventRequest(
        @NotBlank(message = "title must not be empty")
        String title,
        @NotBlank(message = "date must not be empty")
        String date,
        @NotBlank(message = "description must not be empty")
        String description,
        List<String> contacts,
        List<String> categories

) { }
