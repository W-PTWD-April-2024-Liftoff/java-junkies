package com.launchcode.intheloop.service;

import com.launchcode.intheloop.data.PostRepository;
import com.launchcode.intheloop.data.RatingRepository;
import com.launchcode.intheloop.models.Post;
import com.launchcode.intheloop.models.Rating;
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

    @Autowired
    private RatingRepository ratingRepository;

    public Post createPost(Post post){
//        if(post.getContent() != null){
//            post.setContent(post.getContent());
//        }
        return postRepository.save(post);
    }

    public Iterable<Post> getAllPosts() {
        return postRepository.findAll();
    }

    public Optional<Post> getPostById(Long id) {
        return postRepository.findById(id);
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
        post.setTags(updatedPost.getTags());
        return postRepository.save(post);
    }

    public Rating addRating(Long postId, int ratingValue) {
        Optional<Post> optionalPost = postRepository.findById(postId);
        if (optionalPost.isPresent()) {
            Post post = optionalPost.get();
            Rating rating = new Rating();
            rating.setPost(post);
            rating.setRating(ratingValue);
            ratingRepository.save(rating);
            return rating;
        } else {
            throw new RuntimeException("Post not found");
        }
    }
}
