package com.launchcode.intheloop.models;
import java.time.LocalDate;

import jakarta.persistence.*;
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
    private String username;


    @NotBlank(message = "Email can not be empty")
    private String email;

    @Column(name = "pw_hash", nullable = false)
    @NotNull
    private String pwhash;

    @Size(max = 256)
    private String bio;

    @Getter
    private LocalDate dateRegistered = LocalDate.now();

    @Column(name = "profile_picture_upload")
    private String profilePictureUpload;

    public User(){}

    public User(String name, String username, String email, String password, String bio, LocalDate dateRegistered, String profilePictureUpload) {
        this.name = name;
        this.username = username;
        this.email = email;
        this.pwhash = encoder.encode(password);
        this.bio = bio;
        this.dateRegistered = dateRegistered;
        this.profilePictureUpload = profilePictureUpload;
    }

    public static final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public boolean isMatchingPassword(String password) {
        return encoder.matches(password, pwhash);
    }

    public String getProfilePictureUpload() {
        return profilePictureUpload;
    }

    public void setProfilePictureUpload(String profilePictureUpload) {
        this.profilePictureUpload = profilePictureUpload;
    }

    public String getPwhash() {
        return pwhash;
    }

    public void setPwhash(String pwhash) {
        this.pwhash = pwhash;
    }
}