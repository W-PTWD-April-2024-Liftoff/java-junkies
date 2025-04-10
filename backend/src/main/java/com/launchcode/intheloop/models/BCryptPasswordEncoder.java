package com.launchcode.intheloop.models;

import jakarta.validation.constraints.NotNull;

public class BCryptPasswordEncoder {
    public boolean matches(String password, @NotNull String pwHash) {
        return false;
    }


    public @NotNull String encode(String password) {
        return password;
    }
}
