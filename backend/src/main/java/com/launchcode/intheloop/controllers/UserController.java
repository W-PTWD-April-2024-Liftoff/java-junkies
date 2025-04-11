package com.launchcode.intheloop.controllers;
import com.launchcode.intheloop.models.Post;
import com.launchcode.intheloop.models.User;
import com.launchcode.intheloop.service.UserService;
import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;


import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.*;
import java.util.stream.StreamSupport;

import static com.launchcode.intheloop.models.User.encoder;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("user")
public class UserController {


    @Autowired
    private UserService userService;

    @Value("${file.upload-dir:uploads/images}")
    private String uploadDir;


    @GetMapping("")
    public ResponseEntity<?> displayAddUserForm() {
        return ResponseEntity.ok("In The loop is up");
    }

    @PostMapping("/register")
    public ResponseEntity<?> createUser(@RequestBody Map<String, String> userData) {
            try {
                String email = userData.get("email");
                String username = userData.get("username");
                String password = userData.get("password");
                String verify = userData.get("verify");

//                System.out.println("email:" + email);
//                System.out.println("username:" + username);
//                System.out.println("password:" + password);
//                System.out.println("verify:" + verify);

                if (!password.equals(verify)) {
                    return ResponseEntity.badRequest().body(Map.of("error", "Passwords do not match"));
                }

                BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
                String hashedPassword = encoder.encode(password);
//                System.out.println("hashed pw:" + hashedPassword);

                if (hashedPassword == null || hashedPassword.isEmpty()) {
                    System.out.println("hashed pw is null/empty");
                }

                User newUser = new User();
                newUser.setEmail(email);
                newUser.setUsername(username);
                newUser.setPwhash(hashedPassword);

                userService.save(newUser);

                return ResponseEntity.ok(newUser);

            } catch (Exception e) {
                e.printStackTrace();
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body(Map.of("error", "Server error: " + e.getMessage()));
            }
        }


        @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody Map<String, String> loginData) {
        String email = loginData.get("email");
        String password = loginData.get("password");

        Optional<User> optionalUser = userService.findByEmail(email);
        if (optionalUser.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found");
        }

        User user = optionalUser.get();
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

        if (!passwordEncoder.matches(password, user.getPwhash())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }

        return ResponseEntity.ok(Map.of(
                "message", "Login successful",
                "userId", user.getId()
        ));
    }


    @GetMapping("/{id}")
    public ResponseEntity<?> getUserById(@PathVariable Long id) {
        System.out.println("Fetching user with ID: " + id);
        Optional<User> user = userService.findUserById(id);

        if (user.isPresent()) {
            return ResponseEntity.ok(user.get());
        } else {
            return ResponseEntity.status(404).body("User with ID " + id + " not found.");
        }
    }

    @GetMapping("/all")
    public ResponseEntity<Iterable<User>> getAllUsers() {
        Iterable<User> users = userService.getAllUsers();
        if (StreamSupport.stream(users.spliterator(), false).count() == 0) {
            return ResponseEntity.status(404).body(users);
        }
        return ResponseEntity.ok(users);
    }

    @GetMapping("/details/{id}")
    public ResponseEntity<?> displayUserDetails(@PathVariable Long id) {
        Optional<User> user = userService.findUserById(id);

        if (user.isPresent()) {
            return ResponseEntity.ok(user.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
    }


    @GetMapping("/{id}/profile")
        public ResponseEntity<?> getProfile (@PathVariable Long id) {
            Optional<User> optionalUser = userService.findUserById(id);

            if (optionalUser.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
            }

            return ResponseEntity.ok(optionalUser.get());
        }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateUserById(@PathVariable Long id, @RequestBody User user) {
        if (!userService.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
        user.setId(id);
        userService.save(user);

        return ResponseEntity.ok(user);
    }

    @PostMapping("/update-profile/{id}")
    public ResponseEntity<?> updateProfile(@RequestBody User updatedUser) {

        User user;

        if (updatedUser.getId() != null) {
            Optional<User> result = userService.findUserById(updatedUser.getId());

            if (result.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
            }

            user = result.get();
        } else {
            user = new User();
        }
            user.setEmail(updatedUser.getEmail());
            user.setUsername(updatedUser.getUsername());
            user.setName(updatedUser.getName());
            user.setBio(updatedUser.getBio());

            userService.updateUser(user);

            return ResponseEntity.ok(user);
        }


    @PostMapping("/upload-photo")
    public ResponseEntity<?> uploadProfilePicture(
            @RequestParam("profilePicture") MultipartFile file,
            @RequestParam("id") Long userId) throws IOException {

        String contentType = file.getContentType();
        if (!contentType.equals("image/jpeg") && !contentType.equals("image/png")) {
            return ResponseEntity.badRequest().body("Only JPEG or PNG images are allowed");
        }

        Optional<User> optionalUser = userService.findUserById(userId);
        if (optionalUser.isEmpty()) {
            System.out.println("❌ User not found for ID: " + userId);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

            String fileName = userService.saveImageWithUUID(file, uploadDir);
        System.out.println("✅ Saved image filename: " + fileName);

            User user = optionalUser.get();
            user.setProfilePictureUpload(fileName);
        System.out.println("✅ Setting user.profilePictureUpload = " + fileName);
            userService.updateUser(user);
        System.out.println("✅ User updated and saved");

            return ResponseEntity.ok("Profile picture uploaded and linked to user");
    }

    }
