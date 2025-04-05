package com.launchcode.intheloop.controllers;

import com.launchcode.intheloop.service.CommentService;
import com.launchcode.intheloop.service.PostService;
import com.launchcode.intheloop.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SearchController {

    @Autowired
    PostService postService;

    @Autowired
    CommentService commentService;

    @Autowired
    UserService userService;

}
