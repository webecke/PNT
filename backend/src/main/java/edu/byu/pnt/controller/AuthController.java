package edu.byu.pnt.controller;

import edu.byu.pnt.request.LoginRequest;
import edu.byu.pnt.request.LogoutRequest;
import edu.byu.pnt.response.auth.LoginResponse;
import edu.byu.pnt.response.auth.LogoutResponse;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController extends Controller {

    @PostMapping("/login")
    public LoginResponse login(@Valid @RequestBody LoginRequest request) {

        return new LoginResponse(false, "Not implemented yet");
    }

    @PostMapping("/logout")
    public LogoutResponse logout(@Valid @RequestBody LogoutRequest request) {
        return new LogoutResponse(false, "Not implemented yet");
    }
}
