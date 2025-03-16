package com.launchcode.intheloop.service;

import com.launchcode.intheloop.data.UserRepository;
import com.launchcode.intheloop.models.Post;
import com.launchcode.intheloop.models.User;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Optional;

public class UserService {

    @Autowired UserRepository userRepository;

    public Iterable<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    public User createUser(User user){
        return userRepository.save(user);
    }
}
