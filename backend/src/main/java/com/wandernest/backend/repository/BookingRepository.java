package com.wandernest.backend.repository;

import com.wandernest.backend.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    List<Booking> findByUserId(Long userId);

    List<Booking> findByCabinId(Long cabinId);

    List<Booking> findByCabinIdAndCheckOutDateAfterAndCheckInDateBefore(
            Long cabinId,
            LocalDate checkIn,
            LocalDate checkOut
    );

}