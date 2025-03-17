package com.launchcode.intheloop.service;

import com.launchcode.intheloop.data.PostRepository;
import com.launchcode.intheloop.models.Post;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    public Optional<Post> getPostById(Long id) {
        return postRepository.findById(id);
    }

    public Post createPost(Post post){
        return postRepository.save(post);
    }

    public void deletePostById(Long id){
        Optional<Post> results = postRepository.findById(id);

        if(results.isEmpty()){
            throw new NoSuchElementException("Post not found with id "+ id);
        }

        Post post = results.get();
        postRepository.delete(post);
    }

    public Post updatePostById(Long id, Post updatedPost){
        Optional<Post> results = postRepository.findById(id);

        if(results.isEmpty()){
            throw new NoSuchElementException("Post not found with id "+ id);
        }

        Post post = results.get();
        post.setTitle(updatedPost.getTitle());
        post.setContent(updatedPost.getContent());

        return postRepository.save(post);
    }
}
