package com.launchcode.intheloop.controllers;
import com.launchcode.intheloop.data.UserRepository;
import com.launchcode.intheloop.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.StreamSupport;

@RestController
@RequestMapping("user")
public class UserController {

    @Autowired
    private UserRepository userRepository;


    @GetMapping("")
    public String displayAddUserForm() {
        return "user";
    }

    @PostMapping("add")
    public ResponseEntity<String> createUser(@RequestBody User user) {
        if (user.getPassword() == null || user.getPassword().isEmpty()) {
            return ResponseEntity.badRequest().body("Password cannot be null or empty!");
        }

        userRepository.save(user);
        return ResponseEntity.ok("User added successfully!");
    }

    @GetMapping("{id}")
    public ResponseEntity<?> getUser(@PathVariable Long id) {
        System.out.println("Fetching user with ID: " + id);  // Debug log
        Optional<User> user = userRepository.findById(id);

        if (user.isPresent()) {
            return ResponseEntity.ok(user.get());
        } else {
            return ResponseEntity.status(404).body("User with ID " + id + " not found.");
        }
    }

    @GetMapping("all")
    public ResponseEntity<Iterable<User>> getAllUsers() {
        Iterable<User> users = userRepository.findAll();
        if (StreamSupport.stream(users.spliterator(), false).count() == 0) {
            return ResponseEntity.status(404).body(users);
        }
        return ResponseEntity.ok(users);
    }
}
