package com.wandernest.backend.dto.wishlist;

import jakarta.validation.constraints.NotNull;

public class WishlistRequest {

    @NotNull
    private Long userId;

    @NotNull
    private Long cabinId;

    public WishlistRequest() {
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getCabinId() {
        return cabinId;
    }

    public void setCabinId(Long cabinId) {
        this.cabinId = cabinId;
    }
}