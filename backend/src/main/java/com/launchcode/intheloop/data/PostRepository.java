package com.launchcode.intheloop.data;

import com.launchcode.intheloop.models.Post;
import jakarta.persistence.Id;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import javax.naming.directory.SearchResult;
import java.util.List;

@Repository
public interface PostRepository extends CrudRepository<Post, Long> {
//
//    @Query("SELECT p from Post p WHERE "+
//            "LOWER(p.title) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
//            "LOWER(p.content) LIKE LOWER(CONCAT('%', :searchTerm, '%'))")
//    List<Post> searchPosts(String searchTerm);
}
