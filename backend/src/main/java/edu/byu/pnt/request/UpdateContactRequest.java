package edu.byu.pnt.request;

import jakarta.validation.constraints.NotBlank;

public record UpdateContactRequest(
        @NotBlank(message = "id cannot be blank")
        String id,
        @NotBlank(message = "first name cannot be blank")
        String firstName,
        @NotBlank(message = "last name cannot be blank")
        String lastName,
        @NotBlank(message = "email cannot be blank")
        String email,
        @NotBlank(message = "phone cannot be blank")
        String phone,
        @NotBlank(message = "note cannot be blank")
        String note) {
}
