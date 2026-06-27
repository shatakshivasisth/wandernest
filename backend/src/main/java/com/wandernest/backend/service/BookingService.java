package com.wandernest.backend.service;

import com.wandernest.backend.repository.BookingRepository;
import com.wandernest.backend.repository.CabinRepository;
import com.wandernest.backend.repository.UserRepository;
import org.springframework.stereotype.Service;
import com.wandernest.backend.dto.booking.BookingRequest;
import com.wandernest.backend.dto.booking.BookingResponse;
import com.wandernest.backend.entity.Booking;
import com.wandernest.backend.entity.Cabin;
import com.wandernest.backend.entity.User;
import com.wandernest.backend.enums.BookingStatus;
import com.wandernest.backend.exception.BookingException;
import java.util.List;
import java.math.BigDecimal;
import java.time.temporal.ChronoUnit;
@Service
public class BookingService {

    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;
    private final CabinRepository cabinRepository;

    public BookingService(BookingRepository bookingRepository,
                          UserRepository userRepository,
                          CabinRepository cabinRepository) {

        this.bookingRepository = bookingRepository;
        this.userRepository = userRepository;
        this.cabinRepository = cabinRepository;
    }
    public BookingResponse createBooking(BookingRequest request) {

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() ->
                        new BookingException("User not found."));

        Cabin cabin = cabinRepository.findById(request.getCabinId())
                .orElseThrow(() ->
                        new BookingException("Cabin not found."));

        if (!request.getCheckOutDate().isAfter(request.getCheckInDate())) {
            throw new BookingException(
                    "Check-out date must be after check-in date."
            );
        }
        if (!bookingRepository
                .findByCabinIdAndCheckOutDateAfterAndCheckInDateBefore(
                        cabin.getId(),
                        request.getCheckInDate(),
                        request.getCheckOutDate()
                ).isEmpty()) {

            throw new BookingException(
                    "Cabin is already booked for the selected dates."
            );
        }
        long nights = ChronoUnit.DAYS.between(
                request.getCheckInDate(),
                request.getCheckOutDate()
        );

        BigDecimal totalAmount = cabin.getPricePerNight()
                .multiply(BigDecimal.valueOf(nights));

        Booking booking = new Booking();

        booking.setUser(user);
        booking.setCabin(cabin);
        booking.setCheckInDate(request.getCheckInDate());
        booking.setCheckOutDate(request.getCheckOutDate());
        booking.setGuests(request.getGuests());
        booking.setTotalAmount(totalAmount);
        booking.setBookingStatus(BookingStatus.CONFIRMED);

        Booking savedBooking = bookingRepository.save(booking);

        BookingResponse response = new BookingResponse();

        response.setBookingId(savedBooking.getId());
        response.setCabinName(cabin.getTitle());
        response.setCustomerName(user.getFullName());
        response.setCheckInDate(savedBooking.getCheckInDate());
        response.setCheckOutDate(savedBooking.getCheckOutDate());
        response.setGuests(savedBooking.getGuests());
        response.setTotalAmount(savedBooking.getTotalAmount());
        response.setBookingStatus(
                savedBooking.getBookingStatus().name()
        );

        return response;
    }
    public List<BookingResponse> getBookingsByUser(Long userId) {

        List<Booking> bookings = bookingRepository.findByUserId(userId);

        return bookings.stream().map(booking -> {

            BookingResponse response = new BookingResponse();

            response.setBookingId(booking.getId());
            response.setCabinName(booking.getCabin().getTitle());
            response.setCustomerName(booking.getUser().getFullName());
            response.setCheckInDate(booking.getCheckInDate());
            response.setCheckOutDate(booking.getCheckOutDate());
            response.setGuests(booking.getGuests());
            response.setTotalAmount(booking.getTotalAmount());
            response.setBookingStatus(
                    booking.getBookingStatus().name()
            );

            return response;

        }).toList();
    }
    public BookingResponse cancelBooking(Long bookingId) {

        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() ->
                        new BookingException("Booking not found."));

        booking.setBookingStatus(BookingStatus.CANCELLED);

        Booking savedBooking = bookingRepository.save(booking);

        BookingResponse response = new BookingResponse();

        response.setBookingId(savedBooking.getId());
        response.setCabinName(savedBooking.getCabin().getTitle());
        response.setCustomerName(savedBooking.getUser().getFullName());
        response.setCheckInDate(savedBooking.getCheckInDate());
        response.setCheckOutDate(savedBooking.getCheckOutDate());
        response.setGuests(savedBooking.getGuests());
        response.setTotalAmount(savedBooking.getTotalAmount());
        response.setBookingStatus(savedBooking.getBookingStatus().name());

        return response;
    }
}