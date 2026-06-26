package com.wandernest.backend.dto.cabin;

import jakarta.validation.constraints.*;

import java.math.BigDecimal;
import java.util.List;

public class CabinRequest {

    @NotBlank
    private String title;

    @NotBlank
    private String description;

    @NotBlank
    private String location;

    public String getTitle() {
        return title;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setDescription(String description) {
        this.description = description;
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

    public Integer getCapacity() {
        return capacity;
    }

    public Integer getBedrooms() {
        return bedrooms;
    }

    public Integer getBathrooms() {
        return bathrooms;
    }

    public String getHostName() {
        return hostName;
    }

    public List<String> getImageUrls() {
        return imageUrls;
    }

    @NotNull
    @Positive
    private BigDecimal pricePerNight;

    @NotNull
    @Positive
    private Integer capacity;

    @NotNull
    @Positive
    private Integer bedrooms;

    @NotNull
    @Positive
    private Integer bathrooms;

    @NotBlank
    private String hostName;

    private List<String> imageUrls;

    // Generate Getters & Setters
}