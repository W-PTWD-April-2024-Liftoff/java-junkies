package com.launchcode.intheloop.service;

import com.launchcode.intheloop.data.CommentRepository;
import com.launchcode.intheloop.data.PostRepository;
import com.launchcode.intheloop.data.UserRepository;
import com.launchcode.intheloop.models.Comment;
import com.launchcode.intheloop.models.Post;
import com.launchcode.intheloop.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DataService {

    @Autowired
    PostRepository postRepository;

    @Autowired
    CommentRepository commentRepository;

    @Autowired
    UserRepository userRepository;

    Iterable<Post> posts;
    Iterable<Comment> comments;
    Iterable<User> users;

    public Iterable<Post> search(String query) {
        Iterable<Post> posts;
        Iterable<Comment> comments;
        Iterable<User> users;

        posts = postRepository.findAll();
        comments = commentRepository.findAll();
        users = userRepository.findAll();

        return posts;
    }

}
