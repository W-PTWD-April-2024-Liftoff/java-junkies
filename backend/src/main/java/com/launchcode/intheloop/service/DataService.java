package com.launchcode.intheloop.service;

import com.launchcode.intheloop.data.CommentRepository;
import com.launchcode.intheloop.data.PostRepository;
import com.launchcode.intheloop.data.UserRepository;
import com.launchcode.intheloop.models.Comment;
import com.launchcode.intheloop.models.Post;
import com.launchcode.intheloop.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.naming.directory.SearchResult;
import java.util.List;

@Service
public class DataService {

    @Autowired
    PostRepository postRepository;


//    public List<SearchResult> search(@RequestParam String searchTerm) {
//        return postRepository.search(searchTerm);
//    }


}
