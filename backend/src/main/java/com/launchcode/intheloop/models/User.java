package com.launchcode.intheloop.models;
import java.time.LocalDate;
import jakarta.persistence.Entity;
import lombok.Setter;

@Entity
public class User {

    private static int nextId = 1;
    private final int id;

    @Setter
    private String username;
    @Setter
    private String email;
    private String password;
    private final LocalDate dateRegistered;

    public User(int id, LocalDate dateRegistered, String username, String email, String password) {
        this.id = nextId;
        this.dateRegistered = dateRegistered;
        this.username = username;
        this.email = email;
        this.password = password;
        nextId++;
    }

    public int getId() {
        return id;
    }

    public LocalDate getDateRegistered() {
        return dateRegistered;
    }

    public String getUsername() {
        return username;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
