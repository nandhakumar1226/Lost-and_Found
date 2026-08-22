package com.lostfound.controller;

import com.lostfound.dto.ItemRequestDTO;
import com.lostfound.dto.ItemResponseDTO;
import com.lostfound.service.ItemService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/items")
public class ItemController {

    private final ItemService itemService;

    public ItemController(ItemService itemService) {
        this.itemService = itemService;
    }

    @GetMapping
    public ResponseEntity<List<ItemResponseDTO>> getAllItems() {
        return ResponseEntity.ok(itemService.getAllItems());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ItemResponseDTO> getItemById(@PathVariable("id") String id) {
        return ResponseEntity.ok(itemService.getItemById(id));
    }

    @GetMapping("/type/{type}")
    public ResponseEntity<List<ItemResponseDTO>> getItemsByType(@PathVariable("type") String type) {
        return ResponseEntity.ok(itemService.getItemsByType(type));
    }

    @GetMapping("/my")
    public ResponseEntity<List<ItemResponseDTO>> getMyItems(Authentication authentication) {
        if (authentication == null) {
            return ResponseEntity.status(401).build();
        }
        return ResponseEntity.ok(itemService.getItemsByUser(authentication.getName()));
    }

    @GetMapping("/search")
    public ResponseEntity<List<ItemResponseDTO>> searchItems(
            @RequestParam(value = "type", required = false) String type,
            @RequestParam(value = "category", required = false) String category,
            @RequestParam(value = "status", required = false) String status,
            @RequestParam(value = "query", required = false) String query
    ) {
        return ResponseEntity.ok(itemService.searchItems(type, category, status, query));
    }

    @PostMapping
    public ResponseEntity<ItemResponseDTO> createItem(
            @Valid @RequestBody ItemRequestDTO request,
            Authentication authentication
    ) {
        String userEmail = authentication != null ? authentication.getName() : null;
        return ResponseEntity.ok(itemService.createItem(request, userEmail));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<ItemResponseDTO> updateItemStatus(
            @PathVariable("id") String id,
            @RequestParam("status") String status,
            Authentication authentication
    ) {
        if (authentication == null) {
            return ResponseEntity.status(401).build();
        }
        return ResponseEntity.ok(itemService.updateItemStatus(id, status, authentication.getName()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteItem(
            @PathVariable("id") String id,
            Authentication authentication
    ) {
        if (authentication == null) {
            return ResponseEntity.status(401).build();
        }
        itemService.deleteItem(id, authentication.getName());
        return ResponseEntity.noContent().build();
    }
}
