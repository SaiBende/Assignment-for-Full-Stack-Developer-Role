package com.saibende.springbootbackendauthrbac.mapper;

import com.saibende.springbootbackendauthrbac.dto.UserDto;
import com.saibende.springbootbackendauthrbac.entity.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserDto toDto(User user);
}
