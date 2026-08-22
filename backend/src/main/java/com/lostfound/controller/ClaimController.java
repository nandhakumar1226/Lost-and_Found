package com.lostfound.controller;

import com.lostfound.dto.ClaimRequestDTO;
import com.lostfound.dto.ClaimResponseDTO;
import com.lostfound.service.ClaimService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/claims")
public class ClaimController {

    private final ClaimService claimService;

    public ClaimController(ClaimService claimService) {
        this.claimService = claimService;
    }

    @PostMapping
    public ResponseEntity<ClaimResponseDTO> submitClaim(
            @Valid @RequestBody ClaimRequestDTO request,
            Authentication authentication
    ) {
        if (authentication == null) {
            return ResponseEntity.status(401).build();
        }
        return ResponseEntity.ok(claimService.submitClaim(request, authentication.getName()));
    }

    @GetMapping("/my")
    public ResponseEntity<List<ClaimResponseDTO>> getMyClaims(Authentication authentication) {
        if (authentication == null) {
            return ResponseEntity.status(401).build();
        }
        return ResponseEntity.ok(claimService.getMyClaims(authentication.getName()));
    }

}
