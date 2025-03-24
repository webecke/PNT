package edu.byu.pnt.request;

import jakarta.validation.constraints.NotBlank;

public record AddContactRequest(
        @NotBlank(message = "first name cannot be empty")
        String firstName,
        @NotBlank(message = "last name cannot be empty")
        String lastName,
        @NotBlank(message = "email cannot be empty")
        String email,
        @NotBlank(message = "phone cannot be empty")
        String phone,
        @NotBlank(message = "note cannot be empty")
        String note)
{ }
