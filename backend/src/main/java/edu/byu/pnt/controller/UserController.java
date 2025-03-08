package edu.byu.pnt.controller;

import edu.byu.pnt.request.AddUserRequest;
import edu.byu.pnt.dao.DataAccessException;
import edu.byu.pnt.dao.factory.DAOFactory;
import edu.byu.pnt.dao.factory.FactoryProvider;
import edu.byu.pnt.dao.provider.UserDAO;
import edu.byu.pnt.model.User;
import edu.byu.pnt.response.AddUserResponse;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/user")
public class UserController {
    @PostMapping("/add")
    public AddUserResponse addUser(@Valid @RequestBody AddUserRequest request) {
        // Generate id and create the User object
        String id = UUID.randomUUID().toString();
        User newUser = new User(id, request.firstName(), request.lastName(), request.username(), request.password());

        // Add the user to the database
        try {
            DAOFactory factory = new FactoryProvider().getFactory();
            UserDAO userDAO = factory.createUserDAO();
            userDAO.addUser(newUser);
        } catch (DataAccessException e) {
            return new AddUserResponse(false, e.getMessage(), null);
        }
        return new AddUserResponse(true, null, newUser);
    }
}