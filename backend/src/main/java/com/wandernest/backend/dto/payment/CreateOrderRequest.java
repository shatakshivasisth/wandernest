package com.wandernest.backend.dto.payment;

import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;

public class CreateOrderRequest {

    @NotNull
    private Long bookingId;

    @NotNull
    private BigDecimal amount;

    public CreateOrderRequest() {
    }

    public Long getBookingId() {
        return bookingId;
    }

    public void setBookingId(Long bookingId) {
        this.bookingId = bookingId;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }
}