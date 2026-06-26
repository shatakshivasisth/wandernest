package com.wandernest.backend.controller.auth;

import com.wandernest.backend.dto.auth.RegisterRequest;
import com.wandernest.backend.dto.auth.RegisterResponse;
import com.wandernest.backend.entity.User;
import com.wandernest.backend.service.UserService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;
import com.wandernest.backend.dto.auth.LoginRequest;
import com.wandernest.backend.dto.auth.LoginResponse;
import java.util.List;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public RegisterResponse register(@Valid @RequestBody RegisterRequest request) {
        return userService.registerUser(request);
    }
    @PostMapping("/login")
    public LoginResponse login(@Valid @RequestBody LoginRequest request) {
        return userService.loginUser(request);
    }
    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }
}