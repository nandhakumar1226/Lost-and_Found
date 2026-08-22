package com.lostfound.service;

import com.lostfound.dto.ItemRequestDTO;
import com.lostfound.dto.ItemResponseDTO;
import com.lostfound.entity.Item;
import com.lostfound.entity.User;
import com.lostfound.repository.ItemRepository;
import com.lostfound.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ItemService {

    private final ItemRepository itemRepository;
    private final UserRepository userRepository;

    public ItemService(ItemRepository itemRepository, UserRepository userRepository) {
        this.itemRepository = itemRepository;
        this.userRepository = userRepository;
    }

    private synchronized String generateNextItemId() {
        String maxId = itemRepository.findMaxItemId();
        int max = 0;
        if (maxId != null && maxId.startsWith("LF-")) {
            try {
                max = Integer.parseInt(maxId.substring(3));
            } catch (NumberFormatException ignored) {}
        }
        return String.format("LF-%04d", max + 1);
    }

    @Transactional
    public ItemResponseDTO createItem(ItemRequestDTO request, String userEmail) {
        User user = null;
        if (userEmail != null) {
            user = userRepository.findByEmail(userEmail).orElse(null);
        }

        Item item = new Item();
        item.setItemId(generateNextItemId());
        item.setType(request.getType().toUpperCase());
        item.setName(request.getName().trim());
        item.setDescription(request.getDescription().trim());
        item.setCategory(request.getCategory().trim());
        item.setLocation(request.getLocation().trim());
        item.setReportedDate(request.getReportedDate());
        item.setReporterName(request.getReporterName().trim());
        item.setReporterContact(request.getReporterContact().trim());
        item.setStatus("ACTIVE");
        item.setExtraField1(request.getExtraField1());
        item.setExtraField2(request.getExtraField2());
        item.setImageUrl(request.getImageUrl());

        if (user != null) {
            item.setUserId(user.getUserId());
        }

        Item saved = itemRepository.save(item);
        return new ItemResponseDTO(saved);
    }

    public List<ItemResponseDTO> getAllItems() {
        return itemRepository.findAll().stream()
                .map(ItemResponseDTO::new)
                .collect(Collectors.toList());
    }

    public ItemResponseDTO getItemById(String itemId) {
        Item item = itemRepository.findById(itemId)
                .orElseThrow(() -> new IllegalArgumentException("Item not found with ID: " + itemId));
        return new ItemResponseDTO(item);
    }

    public List<ItemResponseDTO> getItemsByType(String type) {
        return itemRepository.findByTypeOrderByCreatedAtDesc(type.toUpperCase()).stream()
                .map(ItemResponseDTO::new)
                .collect(Collectors.toList());
    }

    public List<ItemResponseDTO> getItemsByUser(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new IllegalArgumentException("User not found with email: " + userEmail));
        return itemRepository.findByUserIdOrderByCreatedAtDesc(user.getUserId()).stream()
                .map(ItemResponseDTO::new)
                .collect(Collectors.toList());
    }

    public List<ItemResponseDTO> searchItems(String type, String category, String status, String query) {
        String cleanType = (type != null && !type.isBlank() && !type.equalsIgnoreCase("ALL")) ? type.toUpperCase() : null;
        String cleanCategory = (category != null && !category.isBlank() && !category.equalsIgnoreCase("ALL")) ? category : null;
        String cleanStatus = (status != null && !status.isBlank() && !status.equalsIgnoreCase("ALL")) ? status.toUpperCase() : null;
        String cleanQuery = (query != null && !query.isBlank()) ? query.trim() : null;

        return itemRepository.searchItems(cleanType, cleanCategory, cleanStatus, cleanQuery).stream()
                .map(ItemResponseDTO::new)
                .collect(Collectors.toList());
    }

    @Transactional
    public ItemResponseDTO updateItemStatus(String itemId, String status) {
        return updateItemStatus(itemId, status, null);
    }

    @Transactional
    public ItemResponseDTO updateItemStatus(String itemId, String status, String currentUserEmail) {
        Item item = itemRepository.findById(itemId)
                .orElseThrow(() -> new IllegalArgumentException("Item not found with ID: " + itemId));

        if (currentUserEmail != null) {
            User currentUser = userRepository.findByEmail(currentUserEmail).orElse(null);
            if (currentUser != null && !"ADMIN".equalsIgnoreCase(currentUser.getRole())) {
                if (item.getUserId() == null || !item.getUserId().equals(currentUser.getUserId())) {
                    throw new org.springframework.security.access.AccessDeniedException("You are not authorized to update this item.");
                }
            }
        }

        item.setStatus(status.toUpperCase());
        Item saved = itemRepository.save(item);
        return new ItemResponseDTO(saved);
    }

    @Transactional
    public void deleteItem(String itemId) {
        deleteItem(itemId, null);
    }

    @Transactional
    public void deleteItem(String itemId, String currentUserEmail) {
        Item item = itemRepository.findById(itemId)
                .orElseThrow(() -> new IllegalArgumentException("Item not found with ID: " + itemId));

        if (currentUserEmail != null) {
            User currentUser = userRepository.findByEmail(currentUserEmail).orElse(null);
            if (currentUser != null && !"ADMIN".equalsIgnoreCase(currentUser.getRole())) {
                if (item.getUserId() == null || !item.getUserId().equals(currentUser.getUserId())) {
                    throw new org.springframework.security.access.AccessDeniedException("You are not authorized to delete this item.");
                }
            }
        }

        itemRepository.deleteById(itemId);
    }
}
