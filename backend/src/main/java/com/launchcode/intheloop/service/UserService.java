package com.launchcode.intheloop.service;

import com.launchcode.intheloop.data.UserRepository;
import com.launchcode.intheloop.models.Post;
import com.launchcode.intheloop.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

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

    public void save(User user) {
    }

    public User updateUserById(Long id, User updatedUser){
        Optional<User> results = userRepository.findById(id);

        if(results.isEmpty()){
            throw new NoSuchElementException("User not found with id "+ id);
        }

        User user = results.get();

        user.setEmail(updatedUser.getEmail());
        user.setUsername(updatedUser.getUsername());
        user.setName(updatedUser.getName());
        user.setBio(updatedUser.getBio());

        return userRepository.save(user);
    }

    public boolean deleteFile(String path){
        boolean f = false;
        try {
            File file = new File(path);
            f = file.delete();

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        return f;
    }
    public static boolean saveFile(InputStream is, String path){
        boolean f = false;

        try{
            byte b[] = new byte[is.available()];
            is.read(b);
            FileOutputStream fos = new FileOutputStream(path);
            fos.write(b);
            fos.flush();
            fos.close();
            f = true;
        }catch (Exception e) {
            e.printStackTrace();
        }

        return f;
    }
}
