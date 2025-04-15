package com.launchcode.intheloop.service;

import com.launchcode.intheloop.data.CommentRepository;
import com.launchcode.intheloop.data.PostRepository;
import com.launchcode.intheloop.models.Comment;
import com.launchcode.intheloop.models.Post;
import com.launchcode.intheloop.models.Rating;
import com.launchcode.intheloop.models.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private PostRepository postRepository;

    public List<Comment> getCommentsByPostId(@PathVariable Long postId) {
//        List<Comment> comments = commentRepository.findByPostId(postId);
//        return comments;
        return commentRepository.findByPostId(postId);
    }

    public Comment createComment(@RequestBody Comment comment) {
        return commentRepository.save(comment);
    }

//    public Comment addComment(Comment comment, Long postId) {
//        Post post = postRepository.findById(postId).get();
//        comment.setPost(post);
//        Comment savedComment = commentRepository.save(comment);
//        return comment;
//    }

    public Comment addComment(String text, Long id) {
        Optional<Post> optionalPost = postRepository.findById(id);
        if (optionalPost.isPresent()) {
            Post post = optionalPost.get();
            Comment comment = new Comment();
            comment.setPost(post);
            comment.setText(text);
            commentRepository.save(comment);
            return comment;
        } else {
            throw new RuntimeException("Post not found");
        }
    }
    public Comment updateCommentById(Long id, Comment updatedComment) {
        Optional<Comment> results = commentRepository.findById(id);

        if (results.isEmpty()) {
            throw new NoSuchElementException("Comment not found with id " + id);
        }
        Comment comment = results.get();
        comment.setText(updatedComment.getText());

        return commentRepository.save(comment);
    }

}
