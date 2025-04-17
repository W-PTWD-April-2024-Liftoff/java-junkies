package com.launchcode.intheloop.controllers;

import com.launchcode.intheloop.models.CustomUserDetails;
import com.launchcode.intheloop.models.Post;
import com.launchcode.intheloop.models.Rating;
import com.launchcode.intheloop.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/posts")
public class PostController {

    @Autowired
    public PostService postService;

    @GetMapping
    public Iterable<Post> getAllPosts() {
        return postService.getAllPosts();
    }

    @PostMapping()
    public Post createPost(@AuthenticationPrincipal CustomUserDetails userDetails, @RequestBody Post post) {
        return postService.createPost(post);
    }

    @GetMapping("/{id}")
    public Optional<Post> getPostById(@PathVariable Long id) {
        return postService.getPostById(id);
    }

    @PutMapping("/{id}/rate")
    public Rating addRating(@PathVariable Long id, @RequestBody Rating rating) {
        if (rating.getRating() < 1 || rating.getRating() > 5) {
            throw new IllegalArgumentException("Rating must be between 1 and 5");
        }
        return postService.addRating(id, rating.getRating());
    }
    @DeleteMapping("/{id}")
    public void deletePostById(@PathVariable Long id) {
         postService.deletePostById(id);
    }

    @PutMapping("/{id}")
    public Post updatePostById(@PathVariable Long id,@RequestBody Post updatePost){
        return postService.updatePostById(id, updatePost);
    }

//    @GetMapping("/posts/search")
//    public ResponseEntity<List<Post>> searchPosts(@RequestParam String searchTerm) {
//        System.out.println("searching with " + searchTerm);
//        List<Post> posts = postService.searchPosts(searchTerm);
//        return new ResponseEntity<>(posts, HttpStatus.OK);
//    }
}
