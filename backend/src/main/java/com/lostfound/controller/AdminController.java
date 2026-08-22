package com.lostfound.controller;

import com.lostfound.dto.AdminDashboardStatsDTO;
import com.lostfound.dto.ClaimResponseDTO;
import com.lostfound.dto.ItemResponseDTO;
import com.lostfound.dto.UserDTO;
import com.lostfound.service.AdminService;
import com.lostfound.service.ClaimService;
import com.lostfound.service.ItemService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final AdminService adminService;
    private final ItemService itemService;
    private final ClaimService claimService;

    public AdminController(AdminService adminService,
                           ItemService itemService,
                           ClaimService claimService) {
        this.adminService = adminService;
        this.itemService = itemService;
        this.claimService = claimService;
    }

    @GetMapping("/dashboard")
    public ResponseEntity<AdminDashboardStatsDTO> getDashboardStats() {
        return ResponseEntity.ok(adminService.getDashboardStats());
    }

    @GetMapping("/users")
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        return ResponseEntity.ok(adminService.getAllUsers());
    }

    @PutMapping("/users/{id}/toggle-active")
    public ResponseEntity<UserDTO> toggleUserActive(@PathVariable("id") Long id) {
        return ResponseEntity.ok(adminService.toggleUserActiveStatus(id));
    }

    @PutMapping("/users/{id}/role")
    public ResponseEntity<UserDTO> updateUserRole(
            @PathVariable("id") Long id,
            @RequestParam("role") String role
    ) {
        return ResponseEntity.ok(adminService.updateUserRole(id, role));
    }

    @PutMapping("/users/{id}")
    public ResponseEntity<UserDTO> updateUser(
            @PathVariable("id") Long id,
            @RequestBody com.lostfound.dto.AdminUpdateUserDTO request
    ) {
        return ResponseEntity.ok(adminService.updateUser(id, request));
    }

    @GetMapping("/items")
    public ResponseEntity<List<ItemResponseDTO>> getAllItems() {
        return ResponseEntity.ok(itemService.getAllItems());
    }

    @GetMapping("/claims")
    public ResponseEntity<List<ClaimResponseDTO>> getAllClaims() {
        return ResponseEntity.ok(claimService.getAllClaims());
    }

    @PutMapping("/claims/{id}/approve")
    public ResponseEntity<ClaimResponseDTO> approveClaim(@PathVariable("id") Long id) {
        return ResponseEntity.ok(claimService.updateClaimStatus(id, "APPROVED"));
    }

    @PutMapping("/claims/{id}/reject")
    public ResponseEntity<ClaimResponseDTO> rejectClaim(@PathVariable("id") Long id) {
        return ResponseEntity.ok(claimService.updateClaimStatus(id, "REJECTED"));
    }
}
