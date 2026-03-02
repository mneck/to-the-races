package com.totheraces.controller;

import com.stripe.exception.StripeException;
import com.totheraces.dto.CheckoutRequest;
import com.totheraces.service.StripeService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/checkout")
public class StripeController {

    private final StripeService stripeService;

    public StripeController(StripeService stripeService) {
        this.stripeService = stripeService;
    }

    @PostMapping("/create-session")
    public ResponseEntity<Map<String, String>> createCheckoutSession(@Valid @RequestBody CheckoutRequest request)
            throws StripeException {
        String checkoutUrl = stripeService.createCheckoutSession(request);
        return ResponseEntity.ok(Map.of("url", checkoutUrl));
    }
}
