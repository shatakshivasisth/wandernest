package com.wandernest.backend.repository;

import com.wandernest.backend.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import com.wandernest.backend.enums.BookingStatus;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    List<Booking> findByUserId(Long userId);

    List<Booking> findByCabinId(Long cabinId);

    List<Booking> findByCabinIdAndBookingStatusInAndCheckOutDateAfterAndCheckInDateBefore(
            Long cabinId,
            List<BookingStatus> statuses,
            LocalDate checkIn,
            LocalDate checkOut
    );

    boolean existsByUserIdAndCabinId(Long userId, Long cabinId);
}
