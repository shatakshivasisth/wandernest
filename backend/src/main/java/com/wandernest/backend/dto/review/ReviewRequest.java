package com.wandernest.backend.dto.review;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class ReviewRequest {

    @NotNull
    private Long userId;

    @NotNull
    private Long cabinId;

    @NotNull
    @Min(1)
    @Max(5)
    private Integer rating;

    @NotBlank
    private String comment;

    public ReviewRequest() {
    }

    public Long getUserId() {
        return userId;
    }

    public Long getCabinId() {
        return cabinId;
    }

    public Integer getRating() {
        return rating;
    }

    public String getComment() {
        return comment;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public void setCabinId(Long cabinId) {
        this.cabinId = cabinId;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }
}