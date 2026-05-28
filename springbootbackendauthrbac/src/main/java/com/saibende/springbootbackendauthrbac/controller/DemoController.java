package com.saibende.springbootbackendauthrbac.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class DemoController {

    @GetMapping("/public")
    public ResponseEntity<Map<String, String>> publicEndpoint() {
        return ResponseEntity.ok(Map.of("message", "This is a public endpoint. Anyone can access this."));
    }

    @GetMapping("/user")
    public ResponseEntity<Map<String, String>> userEndpoint() {
        return ResponseEntity.ok(Map.of("message", "This is a USER endpoint. You have the USER role."));
    }

    @GetMapping("/admin")
    public ResponseEntity<Map<String, String>> adminEndpoint() {
        return ResponseEntity.ok(Map.of("message", "This is an ADMIN endpoint. You have the ADMIN role."));
    }
}
