package com.example.lpm.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.lpm.model.User;
import com.example.lpm.service.UserService;

import java.util.List;

@RestController
public class UserController {
    @Autowired
    UserService userService;

    @CrossOrigin
    @GetMapping("/lpm/api/v1/user")
    private List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @CrossOrigin
    @GetMapping("/lpm/api/v1/user/{userId}")
    private User getUser(@PathVariable("userId") String userId) {
        return userService.getUser(userId);
    }

    @CrossOrigin
    @PostMapping("/lpm/api/v1/user")
    private String saveUser(@RequestBody User user) {
        return userService.saveUser(user);
    }

    @CrossOrigin
    @PutMapping("/lpm/api/v1/user")
    private ResponseEntity<?> updateUser(@RequestBody User user) {
        return userService.updateUser(user);
    }

    @CrossOrigin
    @DeleteMapping("/lpm/api/v1/user/{userId}")
    private ResponseEntity<?> deleteUser(@PathVariable("userId") String userId) {
        return userService.deleteUser(userId);
    }

    @CrossOrigin
    @PostMapping("/lpm/api/v1/login")
    private ResponseEntity<?> checkCredentials(@RequestBody User user) {
        return userService.checkCredentials(user);
    }

    @CrossOrigin
    @PostMapping("/lpm/api/v1/fetchReportingUsersList")
    private List<User> fetchReportingUsersList(@RequestBody User user) {
        return userService.fetchReportingUsersList(user);
    }
}
