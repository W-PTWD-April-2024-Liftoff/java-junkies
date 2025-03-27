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

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("user")
public class UserController {

    @Autowired
    private UserService userService;


    @GetMapping("")
    public ResponseEntity<?> displayAddUserForm() {
        return ResponseEntity.ok("In The loop is up");
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
    @GetMapping("id/{id}")
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
        public ResponseEntity<?> getProfile (@RequestParam(defaultValue = "1") Long id) {
            Optional<User> optionalUser = userService.findUserById(id);

            if (optionalUser.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
            }

            return ResponseEntity.ok(optionalUser.get());
        }

    @PostMapping("update-profile")
    public ResponseEntity<?> updateProfile(@RequestBody User request) {
        if (request.getId() == null) {
            return ResponseEntity.badRequest().body("User ID must not be null");
        }

        Optional<User> optionalUser = userService.findUserById(request.getId());

        if(optionalUser.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

        User user = optionalUser.get();

        user.setEmail(request.getEmail());
        user.setUsername(request.getUsername());
        user.setName(request.getName());
        user.setBio(request.getBio());

        userService.updateUser(user);

        return ResponseEntity.ok("User profile updated successfully");
    }

    @PostMapping("profile")
    public ResponseEntity<?> uploadProfilePicture(@RequestParam("profilePicture") MultipartFile file, @RequestParam("id") Long id,HttpServletRequest request){
        Optional<User> optionalUser = userService.findUserById(id);

        if(optionalUser.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

        User user = optionalUser.get();

        try{
            String uploadDir = request.getServletContext().getRealPath("/") + "pics" + java.io.File.separator;
            String fileName = file.getOriginalFilename();
            String filePath = uploadDir + fileName;

            String oldFile = user.getProfilePictureUpload();
            if(oldFile != null && !oldFile.isEmpty()) {
                userService.deleteFile(uploadDir + oldFile);
            }

                boolean saved = userService.saveFile(file.getInputStream(), filePath);
                if (!saved) {
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to save new profile picture");
                }

                user.setProfilePictureUpload(fileName);
                userService.updateUser(user);

            return ResponseEntity.ok("Profile picture updated successfully");

            } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error processing file");
        }
        }


    }
