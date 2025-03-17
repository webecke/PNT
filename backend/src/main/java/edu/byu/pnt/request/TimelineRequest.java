package edu.byu.pnt.request;

import jakarta.validation.constraints.NotBlank;

import java.util.List;

public record TimelineRequest(
        @NotBlank(message = "userID must not be blank.")
        String usersID,
        @NotBlank(message = "categoryIDs must not be blank.")
        List<String> categoryIDs,
        @NotBlank(message = "contactIDs must not be blank.")
        List<String> contactIDs
) {}
