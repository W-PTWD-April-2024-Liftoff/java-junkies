package com.launchcode.intheloop.service;

import com.launchcode.intheloop.data.TagRepository;
import com.launchcode.intheloop.models.Comment;
import com.launchcode.intheloop.models.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class TagService {

    @Autowired
    private TagRepository tagRepository;

    public Tag createTag(Tag tag) {
        return tagRepository.save(tag);
    }

    public Iterable<Tag> getAllTags() {
        return tagRepository.findAll();
    }

    public Optional<Tag> getTagById(Long id){
        return tagRepository.findById(id);
    }

    public void deleteTagById(Long id) {
        Optional<Tag> results = tagRepository.findById(id);
        tagRepository.deleteById(id);
        if(results.isEmpty()){
            throw new NoSuchElementException("Tag not found with id "+ id);
        }
        Tag tag = results.get();
        tagRepository.delete(tag);
    }

    public Tag updateTagById(Long id, Tag updatedTag){
        Optional<Tag> results = tagRepository.findById(id);

        if(results.isEmpty()){
            throw new NoSuchElementException("Tag not found with id "+ id);
        }
        Tag tag = results.get();
        tag.setName(updatedTag.getName());
        tag.setPosts(updatedTag.getPosts());

        return tagRepository.save(tag);
    }
}
