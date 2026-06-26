package com.wandernest.backend.dto.cabin;

import java.math.BigDecimal;
import java.util.List;

public class CabinResponse {

    private Long id;

    public Integer getCapacity() {
        return capacity;
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public void setPricePerNight(BigDecimal pricePerNight) {
        this.pricePerNight = pricePerNight;
    }

    public void setCapacity(Integer capacity) {
        this.capacity = capacity;
    }

    public void setBedrooms(Integer bedrooms) {
        this.bedrooms = bedrooms;
    }

    public void setBathrooms(Integer bathrooms) {
        this.bathrooms = bathrooms;
    }

    public void setRating(Double rating) {
        this.rating = rating;
    }

    public void setHostName(String hostName) {
        this.hostName = hostName;
    }

    public void setImageUrls(List<String> imageUrls) {
        this.imageUrls = imageUrls;
    }

    public String getDescription() {
        return description;
    }

    public String getLocation() {
        return location;
    }

    public BigDecimal getPricePerNight() {
        return pricePerNight;
    }

    public Integer getBedrooms() {
        return bedrooms;
    }

    public Integer getBathrooms() {
        return bathrooms;
    }

    public Double getRating() {
        return rating;
    }

    public String getStatus() {
        return status;
    }

    public String getHostName() {
        return hostName;
    }

    public List<String> getImageUrls() {
        return imageUrls;
    }

    private String title;
    private String description;
    private String location;
    private BigDecimal pricePerNight;
    private Integer capacity;
    private Integer bedrooms;
    private Integer bathrooms;
    private Double rating;
    private String status;
    private String hostName;
    private List<String> imageUrls;

    public CabinResponse() {
    }

    // Generate Getters & Setters
}