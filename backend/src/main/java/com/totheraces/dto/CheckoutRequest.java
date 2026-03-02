package com.totheraces.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CheckoutRequest(
    @NotBlank(message = "Product name is required")
    String productName,

    @NotNull(message = "Amount is required")
    @Min(value = 50, message = "Amount must be at least $0.50 (50 cents)")
    Long amountInCents,

    @NotBlank(message = "Currency is required")
    String currency
) {}
