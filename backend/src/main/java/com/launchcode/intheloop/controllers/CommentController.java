package com.launchcode.intheloop.controllers;

import com.launchcode.intheloop.models.Comment;
import com.launchcode.intheloop.service.CommentService;
import com.launchcode.intheloop.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/comments")
public class CommentController {

    @Autowired
    CommentService commentService;
//
//    @Autowired
//    PostService postService;

//    @GetMapping("/{id}")
//    public List<Comment> getCommentsForPost (@PathVariable Long postId) {
//
//        return commentService.getCommentsByPostId(postId);
//    }
//

//    @PostMapping("/{id}/comment")
//    public Comment addComment(@PathVariable Long id, @RequestBody Comment comment) {
//
//        return commentService.addComment(id, comment.getText());
//    }

    @GetMapping
    public Iterable<Comment> getAllComments () {
        return commentService.getAllComments();
    }

    @PostMapping
    public Comment createComment (@RequestBody Comment comment) {
        return commentService.createComment(comment);
    }

    @GetMapping({"/{id}"})
    public Optional<Comment> getCommentById(@PathVariable Long id) {
        return commentService.getCommentById(id);
    }

    @PutMapping("/{id}")
    public Comment updateComment (@PathVariable Long id, @RequestBody Comment updateComment) {
        return commentService.updateCommentById(id, updateComment);
    }

    @DeleteMapping("/{id}")
    public void deleteComment(@PathVariable Long commentId) {
        commentService.deleteComment(commentId);
    }

}
