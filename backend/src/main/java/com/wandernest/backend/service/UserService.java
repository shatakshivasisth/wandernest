package com.wandernest.backend.service;

import com.wandernest.backend.dto.auth.LoginRequest;
import com.wandernest.backend.dto.auth.LoginResponse;
import com.wandernest.backend.dto.auth.RegisterRequest;
import com.wandernest.backend.dto.auth.RegisterResponse;
import com.wandernest.backend.entity.User;
import com.wandernest.backend.exception.EmailAlreadyExistsException;
import com.wandernest.backend.exception.InvalidCredentialsException;
import com.wandernest.backend.repository.UserRepository;
import com.wandernest.backend.security.JwtService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public UserService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       JwtService jwtService) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public RegisterResponse registerUser(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new EmailAlreadyExistsException("Email already exists.");
        }

        User user = new User();

        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        User savedUser = userRepository.save(user);

        return new RegisterResponse(
                savedUser.getId(),
                savedUser.getFullName(),
                savedUser.getEmail(),
                "Registration Successful"
        );
    }

    public LoginResponse loginUser(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() ->
                        new InvalidCredentialsException("Invalid Email or Password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new InvalidCredentialsException("Invalid Email or Password");
        }

        String token = jwtService.generateToken(user.getEmail());

        return new LoginResponse(
                user.getId(),
                user.getFullName(),
                user.getEmail(),
                token,
                "Login Successful"
        );
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}