package com.saibende.springbootbackendauthrbac.dto;

import com.saibende.springbootbackendauthrbac.entity.Role;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDto {
    private Long id;
    private String name;
    private String email;
    private Role role;
}
