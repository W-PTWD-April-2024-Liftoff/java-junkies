package com.launchcode.intheloop.models;
import java.time.LocalDate;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

@Entity
public class User extends AbstractEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Getter
    @Setter
    @NotBlank(message = "Username can not be empty")
    private String username;

    @Getter
    @Setter
    @NotBlank(message = "Email can not be empty")
    private String email;

    @Getter
    @Setter
    @NotBlank(message = "Password can not be empty")
    private String password;

    @Getter
    @Setter
    @NotBlank(message = "Password can not be empty")
    private String verifiedPassword;

    @Getter
    private LocalDate dateRegistered = LocalDate.now();

    public User(){}

}
