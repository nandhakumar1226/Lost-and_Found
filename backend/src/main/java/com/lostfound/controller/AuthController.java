package com.lostfound.controller;

import com.lostfound.dto.AuthRequest;
import com.lostfound.dto.AuthResponse;
import com.lostfound.dto.RegisterRequest;
import com.lostfound.dto.UserDTO;
import com.lostfound.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody AuthRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authService.register(request));
    }

    @GetMapping("/me")
    public ResponseEntity<UserDTO> getCurrentUser(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(401).build();
        }
        return ResponseEntity.ok(authService.getCurrentUser(authentication.getName()));
    }

    @PostMapping("/reset-password")
    public ResponseEntity<UserDTO> resetPassword(@Valid @RequestBody com.lostfound.dto.ResetPasswordRequest request) {
        return ResponseEntity.ok(authService.resetPassword(request));
    }
}
