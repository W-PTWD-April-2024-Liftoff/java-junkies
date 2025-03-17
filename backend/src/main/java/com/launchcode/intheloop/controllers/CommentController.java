package com.launchcode.intheloop.controllers;

import com.launchcode.intheloop.data.CommentRepository;
import com.launchcode.intheloop.data.PostRepository;
import com.launchcode.intheloop.models.Comment;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("comments")
public class CommentController {

    @Autowired
    CommentRepository commentRepository;

    @Autowired
    PostRepository postRepository;

    @RequestMapping("/")
    public String index(Model model){

        model.addAttribute("title", "Comments");
        model.addAttribute("comments", commentRepository.findAll());

        return "comments/index";
    }


    //need to attach comment to post by id somehow?
    @GetMapping("/new-comment")
    public String newCommentForm(Model model) {

        model.addAttribute("comment", new Comment());
        model.addAttribute("posts", postRepository.findAll());

        return "new-comment";
    }

    @PostMapping("/new-comment")
    public String handleNewComment (Model model, @ModelAttribute @Valid Comment comment, Errors errors) {
        if (errors.hasErrors()) {
            model.addAttribute("comment", comment);
            model.addAttribute("posts", postRepository.findAll());
            return "new-comment";
        }

        commentRepository.save(comment);
        model.addAttribute("comment", comment);
        return "comment";

    }

}
