package edu.byu.pnt.controller;

import edu.byu.pnt.dao.DataAccessException;
import edu.byu.pnt.dao.factory.DAOFactory;
import edu.byu.pnt.dao.factory.FactoryProvider;
import edu.byu.pnt.dao.provider.AuthtokenDAO;
import edu.byu.pnt.dao.provider.UserDAO;
import edu.byu.pnt.model.Authtoken;
import edu.byu.pnt.model.User;
import edu.byu.pnt.request.LoginRequest;
import edu.byu.pnt.request.LogoutRequest;
import edu.byu.pnt.response.auth.LoginResponse;
import edu.byu.pnt.response.auth.LogoutResponse;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/auth")
public class AuthController extends Controller {

    @PostMapping("/login")
    public LoginResponse login(@Valid @RequestBody LoginRequest request) {
        try {
            // Create the factory and DAO
            DAOFactory factory = new FactoryProvider().getFactory();
            UserDAO userDAO = factory.createUserDAO();
            AuthtokenDAO authtokenDAO = factory.createAuthtokenDAO();

            // Get user in database
            User user = userDAO.getUser(request.username());

            // Verify password
            // TODO add more robust password verifications and hashing
            if (!request.password().equals(user.getPassword())) {
                return new LoginResponse(false, "Password incorrect", null);
            }

            // Build new authtoken
            Authtoken authtoken = this.buildAuthtoken(request.username());

            // Add authtoken to database
            authtokenDAO.addAuthtoken(authtoken);

            return new LoginResponse(true, null, authtoken.token());
        } catch (DataAccessException e) {
            return new LoginResponse(false, e.getMessage(), null);
        }
    }

    @PostMapping("/logout")
    public LogoutResponse logout(@RequestHeader("Authorization") String token, @Valid @RequestBody LogoutRequest request) {
        try {
            // Authenticate token
            Authtoken authtoken = this.authenticate(token);

            // Create the factory and DAO
            DAOFactory factory = new FactoryProvider().getFactory();
            AuthtokenDAO authtokenDAO = factory.createAuthtokenDAO();

            // Delete the authtoken for the user
            authtokenDAO.deleteAuthtoken(authtoken);

            return new LogoutResponse(true, null);
        } catch (DataAccessException e) {
            return new LogoutResponse(false, e.getMessage());
        }
    }
}
