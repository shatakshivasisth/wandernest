package com.wandernest.backend.repository;

import com.wandernest.backend.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    List<Review> findByCabinId(Long cabinId);

    List<Review> findByUserId(Long userId);

    Optional<Review> findByUserIdAndCabinId(Long userId, Long cabinId);
}