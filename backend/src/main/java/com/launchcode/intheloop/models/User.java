package com.launchcode.intheloop.models;
import java.time.LocalDate;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Setter;
import lombok.NoArgsConstructor;

@Entity
public class User extends AbstractEntity {


    @Setter
    private String username;

    @Setter
    private String email;
    private String password;
    private LocalDate dateRegistered = LocalDate.now();

    public User(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
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
