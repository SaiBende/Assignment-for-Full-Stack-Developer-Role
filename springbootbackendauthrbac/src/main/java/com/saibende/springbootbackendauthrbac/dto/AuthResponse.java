package com.saibende.springbootbackendauthrbac.dto;

import com.saibende.springbootbackendauthrbac.entity.Role;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuthResponse {
    private String token;
    private String email;
    private String name;
    private Role role;
}
