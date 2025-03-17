package edu.byu.pnt.request;

import jakarta.validation.constraints.NotBlank;

public record UpdateUserRequest(
        @NotBlank(message = "id must not be empty")
        String id,
        @NotBlank(message = "First name must not be empty")
        String firstName,
        @NotBlank(message = "Last name must not be empty")
        String lastName,
        @NotBlank(message = "Username must not be empty")
        String username,
        @NotBlank(message = "Password must not be empty")
        String password
) { }
