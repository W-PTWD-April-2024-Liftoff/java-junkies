package com.launchcode.intheloop.controllers;
import com.launchcode.intheloop.models.User;
import com.launchcode.intheloop.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.StreamSupport;

@RestController
@RequestMapping("user")
public class UserController {

    @Autowired
    private UserService userService;


    @GetMapping("")
    public String displayAddUserForm() {
        return "user";
    }

    @PostMapping("add")
    public ResponseEntity<String> createUser(@RequestBody User user) {
        if (user.getPassword() == null || user.getVerifiedPassword() == null) {
            return ResponseEntity.badRequest().body("Password fields cannot be null.");
        }

        if (!Objects.equals(user.getPassword(), user.getVerifiedPassword())) {
            return ResponseEntity.status(400).body("Passwords do not match");
        }

        userService.save(user);
        return ResponseEntity.ok("User added successfully!");
    }
    @GetMapping("{id}")
    public ResponseEntity<?> getUserById(@PathVariable Long id) {
        System.out.println("Fetching user with ID: " + id);
        Optional<User> user = userService.findUserById(id);

        if (user.isPresent()) {
            return ResponseEntity.ok(user.get());
        } else {
            return ResponseEntity.status(404).body("User with ID " + id + " not found.");
        }
    }

    @GetMapping("all")
    public ResponseEntity<Iterable<User>> getAllUsers() {
        Iterable<User> users = userService.getAllUsers();
        if (StreamSupport.stream(users.spliterator(), false).count() == 0) {
            return ResponseEntity.status(404).body(users);
        }
        return ResponseEntity.ok(users);
    }

    @GetMapping("profile")
    public String displayProfile (){return "profile";}

    @PostMapping("update-profile")
    public ResponseEntity<?> updateProfile(@RequestBody User request) {
        Optional<User> user = userService.findUserById(request.getId());

        if(user.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

        user.get().setEmail(request.getEmail());
        user.get().setUsername(request.getUsername());
        user.get().setName(request.getName());
        user.get().setBio(request.getBio());

        userService.updateUser(user.orElse(null));

        return ResponseEntity.ok("User profile updated successfully");
    }

    @PostMapping("profile")
    public ResponseEntity<?> uploadProfilePicture(@RequestBody User updatedUser, @RequestParam("profilePicture") MultipartFile file, HttpServletRequest request){
        try{
            String uploadDir = request.getServletContext().getRealPath("/") + "pics" + java.io.File.separator + "image.jpg";
            String filePath = uploadDir + file.getOriginalFilename();

            if(userService.deleteFile(filePath)) {
                boolean saved = userService.saveFile(file.getInputStream(), filePath);
                if (saved) {
                    System.out.println("Profile picture updated");
                    updatedUser.setProfilePictureUpload(file.getOriginalFilename());
                } else {
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to save new profile picture");
                }
            } else {
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete existing profile picture");
                }

            userService.updateUser(updatedUser);

            return ResponseEntity.ok("Profile updated successfully");

            } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error processing file");
        }
        }


    }
