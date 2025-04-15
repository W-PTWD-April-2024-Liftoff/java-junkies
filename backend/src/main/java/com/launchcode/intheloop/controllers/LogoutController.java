package com.launchcode.intheloop.controllers;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/logout")
public class LogoutController {
    @PostMapping
    public ResponseEntity<String> logout(HttpServletRequest request) {
        request.getSession().invalidate(); // Invalidate session
        SecurityContextHolder.clearContext(); // Clear security context
        return ResponseEntity.ok("Logged out successfully");
    }
}
