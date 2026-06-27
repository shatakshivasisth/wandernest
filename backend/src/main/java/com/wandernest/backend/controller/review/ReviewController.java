package com.wandernest.backend.controller.review;

import com.wandernest.backend.dto.review.ReviewRequest;
import com.wandernest.backend.dto.review.ReviewResponse;
import com.wandernest.backend.service.ReviewService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
@RequestMapping("/api/v1/reviews")
public class ReviewController {

    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @PostMapping
    public ReviewResponse addReview(
            @Valid @RequestBody ReviewRequest request) {

        return reviewService.addReview(request);
    }
    @GetMapping("/cabin/{cabinId}")
    public List<ReviewResponse> getReviewsByCabin(
            @PathVariable Long cabinId) {

        return reviewService.getReviewsByCabin(cabinId);
    }
    @DeleteMapping("/{reviewId}")
    public String deleteReview(
            @PathVariable Long reviewId) {

        reviewService.deleteReview(reviewId);

        return "Review deleted successfully.";
    }
}