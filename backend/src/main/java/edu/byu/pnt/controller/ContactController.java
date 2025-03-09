package edu.byu.pnt.controller;

import edu.byu.pnt.request.AddContactRequest;
import edu.byu.pnt.request.UpdateContactRequest;
import edu.byu.pnt.response.contact.AddContactResponse;
import edu.byu.pnt.response.contact.DeleteContactResponse;
import edu.byu.pnt.response.contact.GetContactResponse;
import edu.byu.pnt.response.contact.UpdateContactResponse;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/contact")
public class ContactController {

    @GetMapping("/{id}")
    public GetContactResponse getContact(@PathVariable String id) {
        return new GetContactResponse(false, "Not implemented yet");
    }

    @DeleteMapping("/{id}")
    public DeleteContactResponse deleteContact(@PathVariable String id) {
        return new DeleteContactResponse(false, "Not implemented yet");
    }

    @PostMapping("/add")
    public AddContactResponse addContact(@Valid @RequestBody AddContactRequest request) {
        return new AddContactResponse(false, "Not implemented yet");
    }

    @PostMapping("/update")
    public UpdateContactResponse updateContact(@Valid @RequestBody UpdateContactRequest request) {
        return new UpdateContactResponse(false, "Not implemented yet");
    }
}
