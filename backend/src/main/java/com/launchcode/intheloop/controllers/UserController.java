package com.launchcode.intheloop.controllers;
import com.launchcode.intheloop.data.UserRepository;
import com.launchcode.intheloop.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("user")
public class UserController {

    @Autowired
    private UserRepository userRepository;


    @GetMapping("")
    public String displayAddUserForm() {
        return "user/add";
    }

    @PostMapping("")
    public String createUser(Model model, @ModelAttribute User user, String verify) {
        if (!user.getPassword().equals(verify)) {
            model.addAttribute("username", user.getUsername());
            model.addAttribute("email", user.getEmail());
            model.addAttribute("error", "Passwords do not match");
            return "user/add";
        }
        userRepository.save(user);
        model.addAttribute("user", user);
        model.addAttribute("users", userRepository.findAll());
        return "user/index";
    }

    @GetMapping("details/{id}")
    public String displayUserDetails(@PathVariable int id, Model model){

        model.addAttribute("user", userRepository.findById(id));
        return "user/details";
    }
}
