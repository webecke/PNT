package edu.byu.pnt.controller;

import edu.byu.pnt.dao.provider.AuthtokenDAO;
import edu.byu.pnt.model.Authtoken;
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
        try {
            // Create the factory and DAO
            DAOFactory factory = new FactoryProvider().getFactory();
            UserDAO userDAO = factory.createUserDAO();
            AuthtokenDAO authtokenDAO = factory.createAuthtokenDAO();

            // Add the new user to the database
            User newUser = new User(request.firstName(), request.lastName(), request.username(), request.password());
            userDAO.addUser(newUser);

            // Generate authtoken and add it to the database
            Authtoken authtoken = this.buildAuthtoken(request.username());
            authtokenDAO.addAuthtoken(authtoken);

            return new AddUserResponse(true, null, newUser, authtoken.token());
        } catch (DataAccessException e) {
            return new AddUserResponse(false, e.getMessage(), null, null);
        }
    }

    @PostMapping("/update")
    public UpdateUserResponse updateUser(@RequestHeader("Authorization") String token, @Valid @RequestBody UpdateUserRequest request) {
        try {
            // Authenticate token
            Authtoken authtoken = this.authenticate(token);

            // Create the factory and DAO
            DAOFactory factory = new FactoryProvider().getFactory();
            UserDAO userDAO = factory.createUserDAO();

            // Update the user
            userDAO.updateUser(request.firstName(), request.lastName(), authtoken.userID(), request.password());

            return new UpdateUserResponse(true, null);
        } catch (DataAccessException e) {
            return new UpdateUserResponse(false, e.getMessage());
        }
    }
}
