package com.wandernest.backend.service;

import com.wandernest.backend.dto.review.ReviewRequest;
import com.wandernest.backend.dto.review.ReviewResponse;
import com.wandernest.backend.entity.Cabin;
import com.wandernest.backend.entity.Review;
import com.wandernest.backend.entity.User;
import com.wandernest.backend.exception.ReviewException;
import com.wandernest.backend.repository.BookingRepository;
import com.wandernest.backend.repository.CabinRepository;
import com.wandernest.backend.repository.ReviewRepository;
import com.wandernest.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;
    private final CabinRepository cabinRepository;
    private final BookingRepository bookingRepository;

    public ReviewService(
            ReviewRepository reviewRepository,
            UserRepository userRepository,
            CabinRepository cabinRepository,
            BookingRepository bookingRepository) {

        this.reviewRepository = reviewRepository;
        this.userRepository = userRepository;
        this.cabinRepository = cabinRepository;
        this.bookingRepository = bookingRepository;
    }

    public ReviewResponse addReview(ReviewRequest request) {

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() ->
                        new ReviewException("User not found."));

        Cabin cabin = cabinRepository.findById(request.getCabinId())
                .orElseThrow(() ->
                        new ReviewException("Cabin not found."));

        if (!bookingRepository.existsByUserIdAndCabinId(
                request.getUserId(),
                request.getCabinId())) {

            throw new ReviewException(
                    "You can review only cabins you have booked.");
        }

        if (reviewRepository.findByUserIdAndCabinId(
                request.getUserId(),
                request.getCabinId()).isPresent()) {

            throw new ReviewException(
                    "You have already reviewed this cabin.");
        }

        Review review = new Review();

        review.setUser(user);
        review.setCabin(cabin);
        review.setRating(request.getRating());
        review.setComment(request.getComment());

        Review savedReview = reviewRepository.save(review);

        updateCabinRating(cabin);

        ReviewResponse response = new ReviewResponse();

        response.setReviewId(savedReview.getId());
        response.setCustomerName(user.getFullName());
        response.setCabinTitle(cabin.getTitle());
        response.setRating(savedReview.getRating());
        response.setComment(savedReview.getComment());

        return response;
    }
    public List<ReviewResponse> getReviewsByCabin(Long cabinId) {

        List<Review> reviews = reviewRepository.findByCabinId(cabinId);

        return reviews.stream().map(review -> {

            ReviewResponse response = new ReviewResponse();

            response.setReviewId(review.getId());
            response.setCustomerName(review.getUser().getFullName());
            response.setCabinTitle(review.getCabin().getTitle());
            response.setRating(review.getRating());
            response.setComment(review.getComment());

            return response;

        }).toList();
    }
    private void updateCabinRating(Cabin cabin) {

        List<Review> reviews =
                reviewRepository.findByCabinId(cabin.getId());

        double average = reviews.stream()
                .mapToInt(Review::getRating)
                .average()
                .orElse(0.0);

        cabin.setRating(average);

        cabinRepository.save(cabin);
    }
    public void deleteReview(Long reviewId) {

        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() ->
                        new ReviewException("Review not found."));

        Cabin cabin = review.getCabin();

        reviewRepository.delete(review);

        updateCabinRating(cabin);
    }
}