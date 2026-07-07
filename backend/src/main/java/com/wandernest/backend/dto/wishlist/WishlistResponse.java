package com.wandernest.backend.dto.wishlist;

public class WishlistResponse {

    private Long wishlistId;
    private Long cabinId;
    private String cabinTitle;
    private String location;
    private String imageUrl;
    private Double rating;
    private String price;

    public WishlistResponse() {
    }

    public Long getWishlistId() {
        return wishlistId;
    }

    public void setWishlistId(Long wishlistId) {
        this.wishlistId = wishlistId;
    }

    public Long getCabinId() {
        return cabinId;
    }

    public void setCabinId(Long cabinId) {
        this.cabinId = cabinId;
    }

    public String getCabinTitle() {
        return cabinTitle;
    }

    public void setCabinTitle(String cabinTitle) {
        this.cabinTitle = cabinTitle;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public Double getRating() {
        return rating;
    }

    public void setRating(Double rating) {
        this.rating = rating;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }
}