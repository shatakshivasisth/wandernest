package com.wandernest.backend.dto.review;

public class ReviewResponse {

    private Long reviewId;
    private String customerName;
    private String cabinTitle;
    private Integer rating;
    private String comment;

    public ReviewResponse() {
    }

    public Long getReviewId() {
        return reviewId;
    }

    public void setReviewId(Long reviewId) {
        this.reviewId = reviewId;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getCabinTitle() {
        return cabinTitle;
    }

    public void setCabinTitle(String cabinTitle) {
        this.cabinTitle = cabinTitle;
    }

    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }
}