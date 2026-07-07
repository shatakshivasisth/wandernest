package com.wandernest.backend.service;

import com.wandernest.backend.dto.review.ReviewRequest;
import com.wandernest.backend.dto.review.ReviewResponse;
import com.wandernest.backend.entity.Cabin;
import com.wandernest.backend.entity.Review;
import com.wandernest.backend.entity.User;
import com.wandernest.backend.repository.CabinRepository;
import com.wandernest.backend.repository.ReviewRepository;
import com.wandernest.backend.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;
    private final CabinRepository cabinRepository;

    public ReviewService(
            ReviewRepository reviewRepository,
            UserRepository userRepository,
            CabinRepository cabinRepository
    ) {
        this.reviewRepository = reviewRepository;
        this.userRepository = userRepository;
        this.cabinRepository = cabinRepository;
    }

    public ReviewResponse addReview(ReviewRequest request) {

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        Cabin cabin = cabinRepository.findById(request.getCabinId())
                .orElseThrow(() -> new EntityNotFoundException("Cabin not found"));

        Review review = new Review();

        review.setUser(user);
        review.setCabin(cabin);
        review.setRating(request.getRating());
        review.setComment(request.getComment());

        Review savedReview = reviewRepository.save(review);

        return map(savedReview);
    }

    public List<ReviewResponse> getReviewsByCabin(Long cabinId) {

        return reviewRepository
                .findByCabinIdOrderByCreatedAtDesc(cabinId)
                .stream()
                .map(this::map)
                .toList();

    }

    public void deleteReview(Long reviewId) {

        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() ->
                        new EntityNotFoundException("Review not found"));

        reviewRepository.delete(review);

    }

    private ReviewResponse map(Review review) {

        ReviewResponse response = new ReviewResponse();

        response.setReviewId(review.getId());
        response.setUserName(review.getUser().getFullName());
        response.setRating(review.getRating());
        response.setComment(review.getComment());
        response.setCreatedAt(review.getCreatedAt());

        return response;

    }

}