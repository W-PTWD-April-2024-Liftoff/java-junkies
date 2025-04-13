package com.launchcode.intheloop.controllers;

import com.launchcode.intheloop.data.CommentRepository;
import com.launchcode.intheloop.data.PostRepository;
import com.launchcode.intheloop.data.UserRepository;
import com.launchcode.intheloop.models.Comment;
import com.launchcode.intheloop.models.Post;
import com.launchcode.intheloop.models.User;
import com.launchcode.intheloop.service.DataService;
import com.launchcode.intheloop.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.awt.*;
import java.util.List;

@RestController
public class SearchController {

    @Autowired
    DataService dataService;

    @Autowired
    PostRepository postRepository;

    @Autowired
    CommentRepository commentRepository;

    @Autowired
    UserRepository userRepository;

    @RequestMapping("")
    public String search() {
        return search();
    }

//    @PostMapping("results")
//    public String displaySearchResults(@RequestParam String searchTerm) {
//        Iterable<Post> posts;
//        Iterable<Comment> comments;
//        Iterable<User> users;
//
//        if (searchTerm.toLowerCase().equals("")) {
//            posts = postRepository.findAll();
//            comments = commentRepository.findAll();
//            users = userRepository.findAll();
//        } else {
////            posts = ()
//        }
//
//
//    }

//    public List<Post> search(@RequestParam String query) {
//        return dataService.search(query);
    }

