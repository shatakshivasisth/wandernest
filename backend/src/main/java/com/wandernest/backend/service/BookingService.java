package com.wandernest.backend.service;

import com.wandernest.backend.dto.booking.BookingRequest;
import com.wandernest.backend.dto.booking.BookingResponse;
import com.wandernest.backend.entity.Booking;
import com.wandernest.backend.entity.Cabin;
import com.wandernest.backend.entity.User;
import com.wandernest.backend.enums.BookingStatus;
import com.wandernest.backend.exception.BookingException;
import com.wandernest.backend.repository.BookingRepository;
import com.wandernest.backend.repository.CabinRepository;
import com.wandernest.backend.repository.UserRepository;
import com.wandernest.backend.repository.PaymentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;
    private final CabinRepository cabinRepository;
    private final PaymentRepository paymentRepository;

    public BookingService(
            BookingRepository bookingRepository,
            UserRepository userRepository,
            CabinRepository cabinRepository,
            PaymentRepository paymentRepository
    ) {
        this.bookingRepository = bookingRepository;
        this.userRepository = userRepository;
        this.cabinRepository = cabinRepository;
        this.paymentRepository = paymentRepository;
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

        if (request.getGuests() > cabin.getCapacity()) {

            throw new BookingException(
                    "Maximum capacity of this cabin is "
                            + cabin.getCapacity() + " guests."
            );

        }

        boolean alreadyBooked = !bookingRepository
                .findByCabinIdAndBookingStatusInAndCheckOutDateAfterAndCheckInDateBefore(
                        cabin.getId(),
                        List.of(BookingStatus.PENDING, BookingStatus.CONFIRMED),
                        request.getCheckInDate(),
                        request.getCheckOutDate()
                )
                .isEmpty();

        if (alreadyBooked) {

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
        booking.setBookingStatus(BookingStatus.PENDING);

        Booking savedBooking = bookingRepository.save(booking);

        return mapToResponse(savedBooking);

    }

    public List<BookingResponse> getBookingsByUser(Long userId) {

        return bookingRepository.findByUserId(userId)
                .stream()
                .map(this::mapToResponse)
                .toList();

    }

    public BookingResponse cancelBooking(Long bookingId) {

        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() ->
                        new BookingException("Booking not found."));

        if (booking.getBookingStatus() == BookingStatus.CANCELLED) {

            throw new BookingException(
                    "Booking already cancelled."
            );

        }

        booking.setBookingStatus(BookingStatus.CANCELLED);

        Booking savedBooking = bookingRepository.save(booking);

        return mapToResponse(savedBooking);

    }

    private BookingResponse mapToResponse(Booking booking) {

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

    }
    @Transactional
    public void deletePendingBooking(Long bookingId) {

        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() ->
                        new BookingException("Booking not found."));

        if (booking.getBookingStatus() != BookingStatus.PENDING) {

            throw new BookingException(
                    "Only pending bookings can be deleted."
            );

        }

        paymentRepository.deleteByBookingId(bookingId);
        bookingRepository.delete(booking);

    }

}
