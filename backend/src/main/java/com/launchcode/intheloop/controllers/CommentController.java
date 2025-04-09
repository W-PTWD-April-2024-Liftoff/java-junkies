package com.launchcode.intheloop.controllers;

import com.launchcode.intheloop.models.Comment;
import com.launchcode.intheloop.service.CommentService;
import com.launchcode.intheloop.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/comments")
public class CommentController {

    @Autowired
    CommentService commentService;

    @Autowired
    PostService postService;

    @GetMapping
    public Iterable<Comment> getAllComments () {
        return commentService.getAllComments();
    }

    @PostMapping
    public Comment createComment(@PathVariable Long id, @RequestBody Comment comment) {
        return commentService.createComment(id, comment);
    }

    @GetMapping("/{id}")
    public Optional<Comment> getCommentById (@PathVariable Long id) {
        return commentService.getCommentById(id);
    }

    @PostMapping("/{id}")
    public void deleteCommentById(@PathVariable Long id) {
        commentService.deleteCommentById(id);
    }

    @PutMapping("/{id}")
    public Comment updateComment (@PathVariable Long id, @RequestBody Comment updateComment) {
        return commentService.updateCommentById(id, updateComment);
    }






//    @RequestMapping("/")
//    public String index(Model model){
//
//        model.addAttribute("title", "Comments");
//        model.addAttribute("comments", commentRepository.findAll());
//
//        return "comments/index";
//    }
//
//
//    //need to attach comment to post by id somehow?
//    @GetMapping("/new-comment")
//    public String newCommentForm(Model model) {
//
//        model.addAttribute("comment", new Comment());
//        model.addAttribute("posts", postRepository.findAll());
//
//        return "new-comment";
//    }
//
//    @PostMapping("/new-comment")
//    public String handleNewComment (Model model, @ModelAttribute @Valid Comment comment, Errors errors) {
//        if (errors.hasErrors()) {
//            model.addAttribute("comment", comment);
//            model.addAttribute("posts", postRepository.findAll());
//            return "new-comment";
//        }
//
//        commentRepository.save(comment);
//        model.addAttribute("comment", comment);
//        return "comment";
//
//    }

}