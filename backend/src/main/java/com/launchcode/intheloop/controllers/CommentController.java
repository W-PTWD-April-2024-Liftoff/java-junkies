package com.launchcode.intheloop.controllers;

import com.launchcode.intheloop.data.CommentRepository;
import com.launchcode.intheloop.data.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CommentController {

    @Autowired
    CommentRepository commentRepository;

    @Autowired
    PostRepository postRepository;

}
