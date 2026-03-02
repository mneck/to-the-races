package com.totheraces.dto;

public record AuthResponse(
    String token,
    String email,
    String displayName
) {}
