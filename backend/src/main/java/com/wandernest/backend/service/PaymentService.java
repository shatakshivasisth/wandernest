package com.wandernest.backend.service;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.wandernest.backend.dto.payment.CreateOrderRequest;
import com.wandernest.backend.dto.payment.CreateOrderResponse;
import com.wandernest.backend.dto.payment.VerifyPaymentRequest;
import com.wandernest.backend.entity.Booking;
import com.wandernest.backend.entity.Payment;
import com.wandernest.backend.enums.BookingStatus;
import com.wandernest.backend.enums.PaymentStatus;
import com.wandernest.backend.exception.BookingException;
import com.wandernest.backend.repository.BookingRepository;
import com.wandernest.backend.repository.PaymentRepository;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.math.BigDecimal;
import java.nio.charset.StandardCharsets;
import java.util.HexFormat;

@Service
@Transactional
public class PaymentService {

    private final RazorpayClient razorpayClient;
    private final PaymentRepository paymentRepository;
    private final BookingRepository bookingRepository;

    @Value("${RAZORPAY_KEY_ID}")
    private String keyId;

    @Value("${RAZORPAY_KEY_SECRET}")
    private String keySecret;

    public PaymentService(
            RazorpayClient razorpayClient,
            PaymentRepository paymentRepository,
            BookingRepository bookingRepository
    ) {
        this.razorpayClient = razorpayClient;
        this.paymentRepository = paymentRepository;
        this.bookingRepository = bookingRepository;
    }

    public CreateOrderResponse createOrder(CreateOrderRequest request) throws Exception {

        Booking booking = bookingRepository.findById(request.getBookingId())
                .orElseThrow(() -> new BookingException("Booking not found."));

        if (booking.getBookingStatus() != BookingStatus.PENDING) {
            throw new BookingException("Only pending bookings can be paid.");
        }

        if (booking.getTotalAmount().compareTo(request.getAmount()) != 0) {
            throw new BookingException("The payment amount does not match the booking total.");
        }

        JSONObject orderRequest = new JSONObject();

        int amountInPaise = booking.getTotalAmount()
                .movePointRight(2)
                .intValueExact();
        orderRequest.put("amount", amountInPaise);
        orderRequest.put("currency", "INR");
        orderRequest.put("receipt", "BOOKING_" + booking.getId());

        Order order = razorpayClient.orders.create(orderRequest);

        Payment payment = new Payment();

        payment.setBooking(booking);
        payment.setAmount(booking.getTotalAmount());
        payment.setRazorpayOrderId(order.get("id"));
        payment.setPaymentStatus(PaymentStatus.CREATED);

        paymentRepository.save(payment);
       

        return new CreateOrderResponse(
                order.get("id"),
                order.get("currency"),
                order.get("amount"),
                keyId
        );
    }

    public String verifyPayment(VerifyPaymentRequest request) throws Exception {

        Payment payment = paymentRepository
                .findByRazorpayOrderId(request.getRazorpayOrderId())
                .orElseThrow(() ->
                        new BookingException("Payment not found."));

        if (payment.getPaymentStatus() == PaymentStatus.SUCCESS) {
            return "Payment already verified.";
        }
        String generatedSignature = generateSignature(
                request.getRazorpayOrderId(),
                request.getRazorpayPaymentId()
        );

        if (!generatedSignature.equals(request.getRazorpaySignature())) {

            payment.setPaymentStatus(PaymentStatus.FAILED);
            paymentRepository.save(payment);

            throw new BookingException("Invalid payment signature.");

        }

        payment.setRazorpayPaymentId(request.getRazorpayPaymentId());
        payment.setRazorpaySignature(request.getRazorpaySignature());
        payment.setPaymentStatus(PaymentStatus.SUCCESS);

        paymentRepository.save(payment);

        Booking booking = payment.getBooking();

        booking.setBookingStatus(BookingStatus.CONFIRMED);

        bookingRepository.save(booking);

        return "Payment verified successfully.";

    }

    private String generateSignature(
            String orderId,
            String paymentId
    ) throws Exception {

        String payload = orderId + "|" + paymentId;

        Mac sha256Hmac = Mac.getInstance("HmacSHA256");

        SecretKeySpec secretKey = new SecretKeySpec(
                keySecret.getBytes(StandardCharsets.UTF_8),
                "HmacSHA256"
        );

        sha256Hmac.init(secretKey);

        byte[] hash = sha256Hmac.doFinal(
                payload.getBytes(StandardCharsets.UTF_8)
        );

        return HexFormat.of().formatHex(hash);

    }

}
