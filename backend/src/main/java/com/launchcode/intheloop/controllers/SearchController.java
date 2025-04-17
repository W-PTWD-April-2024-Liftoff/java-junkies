package com.launchcode.intheloop.controllers;

import com.launchcode.intheloop.data.CommentRepository;
import com.launchcode.intheloop.data.PostRepository;
import com.launchcode.intheloop.data.UserRepository;
import com.launchcode.intheloop.models.Comment;
import com.launchcode.intheloop.models.Post;
import com.launchcode.intheloop.models.User;
import com.launchcode.intheloop.service.DataService;
import com.launchcode.intheloop.service.PostService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.naming.directory.SearchResult;
import java.awt.*;
import java.util.List;

@RestController
public class SearchController {

    @Autowired
    public PostService postService;


//    @GetMapping("/posts/search")
//    public ResponseEntity<List<Post>> searchPosts(@RequestParam String searchTerm) {
//        System.out.println("searching with " + searchTerm);
//        List<Post> posts = postService.searchPosts(searchTerm);
//        return new ResponseEntity<>(posts, HttpStatus.OK);
//    }
}

