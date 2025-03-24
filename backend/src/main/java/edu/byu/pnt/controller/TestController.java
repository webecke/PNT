package edu.byu.pnt.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController extends Controller {
    @GetMapping("/")
    public String hello() {
        return "Hello from the PNT Backend!";
    }
}
