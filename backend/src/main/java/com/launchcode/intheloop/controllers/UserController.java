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

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.NoSuchElementException;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.StreamSupport;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("user")
public class UserController {
    private static final Logger log = LoggerFactory.getLogger(UserController.class);


    @Autowired
    private UserService userService;

    @Value("${file.upload-dir:uploads/images}")
    private String uploadDir;


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

    @GetMapping("all")
    public ResponseEntity<Iterable<User>> getAllUsers() {
        Iterable<User> users = userService.getAllUsers();
        if (StreamSupport.stream(users.spliterator(), false).count() == 0) {
            return ResponseEntity.status(404).body(users);
        }
        return ResponseEntity.ok(users);
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
    public ResponseEntity<?> updateUserById(@PathVariable Long id, @RequestBody User updateUser) {
        if (!userService.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
        updateUser.setId(id);
        User saved = userService.save(updateUser);

        return ResponseEntity.ok(saved);
    }

    @PostMapping("update-profile")
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


    @PostMapping("images")
    public ResponseEntity<?> uploadProfilePicture(
            @RequestParam("profilePicture") MultipartFile file,
            @RequestParam("id") Long userId) throws IOException {

        String contentType = file.getContentType();
        if (!contentType.equals("image/jpeg") && !contentType.equals("image/png")) {
            return ResponseEntity.badRequest().body("Only JPEG or PNG images are allowed");
        }

        Optional<User> optionalUser = userService.findUserById(userId);
        if (optionalUser.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

        String savedFileName = userService.saveImageWithUUID(file,uploadDir);

        User user = optionalUser.get();

        try {
            String fileName = saveImage(file);

            user.setProfilePictureUpload(savedFileName);
            userService.updateUser(user);

            return ResponseEntity.ok("Profile picture uploaded and linked to user");
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Image upload failed");
        }
    }


    private String saveImage(MultipartFile file) throws IOException {

        Path uploadPath = Paths.get(uploadDir).toAbsolutePath().normalize();

        Files.createDirectories(Paths.get(uploadDir));

        String originalFileName = file.getOriginalFilename();
        System.out.println("📂 Original filename = " + originalFileName);
        String extension = originalFileName.substring(originalFileName.lastIndexOf("."));
        String uniqueName = UUID.randomUUID().toString() + extension;

        Path filePath = uploadPath.resolve(uniqueName);

        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);


        return uniqueName;
    }
    
    @GetMapping("images/{filename}")
    public ResponseEntity<Resource> getImage(@PathVariable String filename) {
        try {
            Path filePath = Paths.get(uploadDir).resolve(filename).normalize();
            System.out.println("📥 Trying to serve: " + filePath);

            UrlResource resource = new UrlResource(filePath.toUri());

            if (resource.exists()) {
                String mimeType = Files.probeContentType(filePath);
                return ResponseEntity.ok()
                        .contentType(MediaType.parseMediaType(mimeType))
                        .body((Resource) resource);
            } else {
                System.out.println("❌ File does not exist at: " + filePath);
                return ResponseEntity.notFound().build();
            }
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    }
