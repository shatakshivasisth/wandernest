package com.wandernest.backend.controller.booking;

import com.wandernest.backend.dto.booking.BookingRequest;
import com.wandernest.backend.dto.booking.BookingResponse;
import com.wandernest.backend.service.BookingService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/bookings")
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @PostMapping
    public BookingResponse createBooking(
            @Valid @RequestBody BookingRequest request) {

        return bookingService.createBooking(request);
    }

    @GetMapping("/user/{userId}")
    public List<BookingResponse> getBookingsByUser(
            @PathVariable Long userId) {

        return bookingService.getBookingsByUser(userId);
    }

    @PutMapping("/{bookingId}/cancel")
    public BookingResponse cancelBooking(
            @PathVariable Long bookingId) {

        return bookingService.cancelBooking(bookingId);
    }

    @DeleteMapping("/{bookingId}")
    public ResponseEntity<Void> deletePendingBooking(
            @PathVariable Long bookingId) {

        bookingService.deletePendingBooking(bookingId);

        return ResponseEntity.noContent().build();
    }
}