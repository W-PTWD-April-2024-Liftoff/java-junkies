package com.launchcode.intheloop.service;

import com.launchcode.intheloop.data.UserRepository;
import com.launchcode.intheloop.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {

    @Autowired UserRepository userRepository;

    public Iterable<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> findUserById(Long id) {
        return userRepository.findById(id);
    }

    public User createUser(User user){
        return userRepository.save(user);
    }


    public void updateUser(User user) {
        userRepository.save(user);
    }

    public void save(User user){
        userRepository.save(user);
    }

    public String saveImageWithUUID(MultipartFile file, String uploadDir) throws IOException {
        Path uploadPath = Paths.get(uploadDir).toAbsolutePath().normalize();
        Files.createDirectories(uploadPath);

        String originalFileName = file.getOriginalFilename();

        String extension = originalFileName.substring(originalFileName.lastIndexOf("."));
        String uniqueName = UUID.randomUUID().toString() + extension;

        Path filePath = uploadPath.resolve(uniqueName);
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
        return uniqueName;
    }


    public boolean existsById(Long id) {
        return false;
    }

    public Optional<User> findByEmail(String email) {
        return Optional.empty();
    }
}

