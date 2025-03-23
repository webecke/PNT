package edu.byu.pnt.request;

import jakarta.validation.constraints.NotBlank;

public record LogoutRequest(
        @NotBlank(message = "username cannot be blank")
        String username
) {}
