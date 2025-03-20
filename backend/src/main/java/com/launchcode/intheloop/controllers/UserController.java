package com.launchcode.intheloop.controllers;
import com.launchcode.intheloop.data.UserRepository;
import com.launchcode.intheloop.models.User;
import com.launchcode.intheloop.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
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
        System.out.println("Fetching user with ID: " + id);  // Debug log
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
}
