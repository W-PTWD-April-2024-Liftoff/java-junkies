package com.launchcode.intheloop.controllers;

import com.launchcode.intheloop.models.Post;
import com.launchcode.intheloop.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping
    public Post createPost(@RequestBody Post post) {
        return postService.createPost(post);
    }

    @GetMapping("/{id}")
    public Optional<Post> getPostById(@PathVariable Long id) {
        return postService.getPostById(id);
    }

    @DeleteMapping("/{id}")
    public void deletePostById(@PathVariable Long id) {
         postService.deletePostById(id);
    }

    @PutMapping("/{id}")
    public Post updatePostById(@PathVariable Long id,@RequestBody Post updatePost){
        return postService.updatePostById(id, updatePost);
    }
}
