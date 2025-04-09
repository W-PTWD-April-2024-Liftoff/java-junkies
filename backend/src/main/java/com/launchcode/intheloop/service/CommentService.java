package com.launchcode.intheloop.service;

import com.launchcode.intheloop.data.CommentRepository;
import com.launchcode.intheloop.data.PostRepository;
import com.launchcode.intheloop.models.Comment;
import com.launchcode.intheloop.models.Post;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private PostRepository postRepository;

//    public Comment createComment(Comment comment){
//        if(comment.getText() != null){
//            comment.setText(comment.getText());
//        }
//        return commentRepository.save(comment);
//    }

    public Comment createComment(Long postId, Comment comment){
        Optional<Post> optionalPost = postRepository.findById(postId);

        if (optionalPost.isPresent()) {
            Post post = optionalPost.get();
            new Comment();
            comment.setPost(post);
            commentRepository.save(comment);
            return comment;
        } else {
            throw new RuntimeException("Post not found");
        }
    }

    public Iterable<Comment> getAllComments(){
       return commentRepository.findAll();
    }

    public Optional<Comment> getCommentById(Long id){
        return commentRepository.findById(id);
    }

    public void deleteCommentById(Long id){
        Optional<Comment> results = commentRepository.findById(id);

     if(results.isEmpty()){
        throw new NoSuchElementException("Comment not found with id "+ id);
        }
     Comment comment = results.get();
     commentRepository.delete(comment);
    }

    public Comment updateCommentById(Long id, Comment updatedComment){
        Optional<Comment> results = commentRepository.findById(id);

        if(results.isEmpty()){
            throw new NoSuchElementException("Comment not found with id "+ id);
        }
        Comment comment = results.get();
        comment.setCreatedAt(updatedComment.getCreatedAt());
        comment.setText(updatedComment.getText());

        return commentRepository.save(comment);
    }
}
