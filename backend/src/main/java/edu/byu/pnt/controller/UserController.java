package edu.byu.pnt.controller;

import edu.byu.pnt.request.AddUserRequest;
import edu.byu.pnt.dao.DataAccessException;
import edu.byu.pnt.dao.factory.DAOFactory;
import edu.byu.pnt.dao.factory.FactoryProvider;
import edu.byu.pnt.dao.provider.UserDAO;
import edu.byu.pnt.model.User;
import edu.byu.pnt.request.UpdateUserRequest;
import edu.byu.pnt.response.user.AddUserResponse;
import edu.byu.pnt.response.user.UpdateUserResponse;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/user")
public class UserController extends Controller {
    @PostMapping("/add")
    public AddUserResponse addUser(@Valid @RequestBody AddUserRequest request) {
        // Generate id and create the User object
        String id = UUID.randomUUID().toString();
        User newUser = new User(id, request.firstName(), request.lastName(), request.username(), request.password());

        try {
            // Create the factory and DAO
            DAOFactory factory = new FactoryProvider().getFactory();
            UserDAO userDAO = factory.createUserDAO();

            // Add the user to the database
            userDAO.addUser(newUser);

            return new AddUserResponse(true, null, newUser);
        } catch (DataAccessException e) {
            return new AddUserResponse(false, e.getMessage(), null);
        }
    }

    @PostMapping("/update")
    public UpdateUserResponse updateUser(@Valid @RequestBody UpdateUserRequest request) {
        try {
            // Create the factory and DAO
            DAOFactory factory = new FactoryProvider().getFactory();
            UserDAO userDAO = factory.createUserDAO();

            // Update the user
            userDAO.updateUser(request.id(), request.firstName(), request.lastName(), request.username(), request.password());

            return new UpdateUserResponse(true, null);
        } catch (DataAccessException e) {
            return new UpdateUserResponse(false, e.getMessage());
        }
    }
}
