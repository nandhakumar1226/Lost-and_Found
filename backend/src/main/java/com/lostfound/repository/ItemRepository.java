package com.lostfound.repository;

import com.lostfound.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItemRepository extends JpaRepository<Item, String> {

    List<Item> findByTypeOrderByCreatedAtDesc(String type);

    List<Item> findByUserIdOrderByCreatedAtDesc(Long userId);

    List<Item> findByTypeAndStatus(String type, String status);

    long countByType(String type);

    long countByStatus(String status);

    long countByTypeAndStatus(String type, String status);

    @Query("SELECT MAX(i.itemId) FROM Item i WHERE i.itemId LIKE 'LF-%'")
    String findMaxItemId();

    @Query("SELECT i FROM Item i WHERE " +
           "(:type IS NULL OR i.type = :type) AND " +
           "(:category IS NULL OR i.category = :category) AND " +
           "(:status IS NULL OR i.status = :status) AND " +
           "(:query IS NULL OR LOWER(i.name) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           " LOWER(i.description) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           " LOWER(i.location) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           " LOWER(i.itemId) LIKE LOWER(CONCAT('%', :query, '%'))) " +
           "ORDER BY i.createdAt DESC")
    List<Item> searchItems(
            @Param("type") String type,
            @Param("category") String category,
            @Param("status") String status,
            @Param("query") String query
    );
}
