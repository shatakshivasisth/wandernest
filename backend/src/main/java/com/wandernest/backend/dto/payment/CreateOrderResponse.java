package com.wandernest.backend.dto.payment;

public class CreateOrderResponse {

    private String orderId;
    private String currency;
    private Integer amount;
    private String key;

    public CreateOrderResponse() {
    }

    public CreateOrderResponse(
            String orderId,
            String currency,
            Integer amount,
            String key
    ) {
        this.orderId = orderId;
        this.currency = currency;
        this.amount = amount;
        this.key = key;
    }

    public String getOrderId() {
        return orderId;
    }

    public String getCurrency() {
        return currency;
    }

    public Integer getAmount() {
        return amount;
    }

    public String getKey() {
        return key;
    }
}