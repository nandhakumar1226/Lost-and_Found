package com.lostfound.service;

import com.lostfound.dto.AuthRequest;
import com.lostfound.dto.AuthResponse;
import com.lostfound.dto.RegisterRequest;
import com.lostfound.dto.UserDTO;
import com.lostfound.entity.User;
import com.lostfound.repository.UserRepository;
import com.lostfound.security.JwtTokenProvider;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider tokenProvider;

    public AuthService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       AuthenticationManager authenticationManager,
                       JwtTokenProvider tokenProvider) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.tokenProvider = tokenProvider;
    }

    public AuthResponse login(AuthRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail().toLowerCase().trim(), request.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = tokenProvider.generateToken(authentication);

        User user = userRepository.findByEmail(request.getEmail().toLowerCase().trim())
                .orElseThrow(() -> new RuntimeException("User not found"));

        return new AuthResponse(token, new UserDTO(user));
    }

    public AuthResponse register(RegisterRequest request) {
        String cleanEmail = request.getEmail().toLowerCase().trim();
        if (userRepository.existsByEmail(cleanEmail)) {
            throw new IllegalArgumentException("Email address is already registered.");
        }

        User user = new User();
        user.setName(request.getName().trim());
        user.setEmail(cleanEmail);
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setPhone(request.getPhone().trim());
        user.setRole(request.getRole() != null && request.getRole().equalsIgnoreCase("ADMIN") ? "ADMIN" : "USER");

        User savedUser = userRepository.save(user);

        String token = tokenProvider.generateTokenFromEmail(savedUser.getEmail());
        return new AuthResponse(token, new UserDTO(savedUser));
    }

    public UserDTO getCurrentUser(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return new UserDTO(user);
    }

    public UserDTO resetPassword(com.lostfound.dto.ResetPasswordRequest request) {
        String cleanEmail = request.getEmail().toLowerCase().trim();
        User user = userRepository.findByEmail(cleanEmail)
                .orElseThrow(() -> new IllegalArgumentException("No account found with email address: " + cleanEmail));

        String cleanPhone = request.getPhone().trim().replaceAll("\\D", "");
        String userPhone = user.getPhone().trim().replaceAll("\\D", "");

        if (!userPhone.equals(cleanPhone)) {
            throw new IllegalArgumentException("Phone number verification failed. Details do not match registered records.");
        }

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        User updated = userRepository.save(user);
        return new UserDTO(updated);
    }
}
