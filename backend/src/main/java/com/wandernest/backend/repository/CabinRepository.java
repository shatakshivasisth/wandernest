package com.wandernest.backend.repository;

import com.wandernest.backend.entity.Cabin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import java.math.BigDecimal;
import java.util.List;

public interface CabinRepository extends JpaRepository<Cabin, Long>,
        JpaSpecificationExecutor<Cabin> {

    List<Cabin> findByLocationContainingIgnoreCase(String location);

    List<Cabin> findByPricePerNightBetween(
            BigDecimal minPrice,
            BigDecimal maxPrice
    );

    List<Cabin> findByCapacityGreaterThanEqual(Integer capacity);

    List<Cabin> findByLocationContainingIgnoreCaseAndPricePerNightBetween(
            String location,
            BigDecimal minPrice,
            BigDecimal maxPrice
    );
}