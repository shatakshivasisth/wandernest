package com.wandernest.backend.controller.payment;
import com.wandernest.backend.dto.payment.CreateOrderRequest;
import com.wandernest.backend.dto.payment.CreateOrderResponse;
import com.wandernest.backend.dto.payment.VerifyPaymentRequest;
import com.wandernest.backend.service.PaymentService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/payments")
public class PaymentController {

    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @PostMapping("/create-order")
    public ResponseEntity<CreateOrderResponse> createOrder(
            @Valid @RequestBody CreateOrderRequest request
    ) throws Exception {

        return ResponseEntity.ok(
                paymentService.createOrder(request)
        );
    }

    @PostMapping("/verify")
    public ResponseEntity<String> verifyPayment(
            @Valid @RequestBody VerifyPaymentRequest request
    ) throws Exception {

        return ResponseEntity.ok(
                paymentService.verifyPayment(request)
        );
    }
}
