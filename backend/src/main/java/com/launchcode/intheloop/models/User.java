package com.launchcode.intheloop.models;
import java.time.LocalDate;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

@Entity
@Setter
@Getter
public class User extends AbstractEntity {


    @Size(min = 3, max = 40)
    private String name;

    @Size(min = 3, max = 30)
    @NotBlank(message = "Username can not be empty")
    private String username;


    @NotBlank(message = "Email can not be empty")
    private String email;


    @NotBlank(message = "Password can not be empty")
    private String password;


    @NotBlank(message = "Password can not be empty")
    private String verifiedPassword;

    @Size(max = 256)
    private String bio;

    @Getter
    private LocalDate dateRegistered = LocalDate.now();

    private String profilePictureUpload;

    public User(){}

    public User(String name, String username, String email, String password, String verifiedPassword, String bio, LocalDate dateRegistered, String profilePictureUpload) {
        this.name = name;
        this.username = username;
        this.email = email;
        this.password = password;
        this.verifiedPassword = verifiedPassword;
        this.bio = bio;
        this.dateRegistered = dateRegistered;
        this.profilePictureUpload = profilePictureUpload;
    }


}