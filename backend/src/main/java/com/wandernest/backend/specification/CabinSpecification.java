package com.wandernest.backend.specification;

import com.wandernest.backend.entity.Cabin;
import org.springframework.data.jpa.domain.Specification;

import java.math.BigDecimal;

public class CabinSpecification {

    public static Specification<Cabin> hasLocation(String location) {

        return (root, query, cb) ->
                location == null || location.isBlank()
                        ? null
                        : cb.like(
                        cb.lower(root.get("location")),
                        "%" + location.toLowerCase() + "%"
                );
    }

    public static Specification<Cabin> hasMinPrice(BigDecimal minPrice) {

        return (root, query, cb) ->
                minPrice == null
                        ? null
                        : cb.greaterThanOrEqualTo(
                        root.get("pricePerNight"),
                        minPrice
                );
    }

    public static Specification<Cabin> hasMaxPrice(BigDecimal maxPrice) {

        return (root, query, cb) ->
                maxPrice == null
                        ? null
                        : cb.lessThanOrEqualTo(
                        root.get("pricePerNight"),
                        maxPrice
                );
    }

    public static Specification<Cabin> hasCapacity(Integer capacity) {

        return (root, query, cb) ->
                capacity == null
                        ? null
                        : cb.greaterThanOrEqualTo(
                        root.get("capacity"),
                        capacity
                );
    }
}