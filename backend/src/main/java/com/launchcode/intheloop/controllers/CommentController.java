package com.launchcode.intheloop.controllers;

import com.launchcode.intheloop.models.Comment;
import com.launchcode.intheloop.service.CommentService;
import com.launchcode.intheloop.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@RestController
@RequestMapping("")
public class CommentController {

    @Autowired
    CommentService commentService;

    @Autowired
    PostService postService;

    @GetMapping("/posts/{postId}/comments")
    public List<Comment> getCommentsForPost (@PathVariable Long postId) {

        return commentService.getCommentsByPostId(postId);
    }

    @PostMapping("/posts/{postId}/comments")
    public Comment createComment(@PathVariable Long postId, @RequestBody Comment comment) {

        return commentService.addComment(comment, postId);
    }

//    @PutMapping("/{id}")
//    public Comment updateComment (@PathVariable Long id, @RequestBody Comment updateComment) {
//        return commentService.updateCommentById(id, updateComment);
//    }
//
//    @DeleteMapping("/delete")
//    public void deleteComment(@PathVariable Long commentId) {
//        commentService.deleteCommentById(commentId);
//    }

}
