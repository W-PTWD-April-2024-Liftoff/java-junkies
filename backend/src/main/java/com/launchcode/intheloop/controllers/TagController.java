package com.launchcode.intheloop.controllers;
import com.launchcode.intheloop.models.Tag;
import com.launchcode.intheloop.service.TagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/tags")
public class TagController {

    @Autowired
    public TagService tagService;

    @PostMapping
    public Tag createTag(@RequestBody Tag tag) {
        return tagService.createTag(tag);
    }

    @GetMapping
    public Iterable<Tag> getAllTags() {
        return tagService.getAllTags();
    }

    @GetMapping("/{id}")
    public Optional<Tag> getTagById(@PathVariable Long id) {
       return tagService.getTagById(id);
    }

    @PutMapping("/{id}")
    public Tag updateTagById(@PathVariable Long id, @RequestBody Tag updatedTag) {
        return tagService.updateTagById(id, updatedTag);
    }

    @DeleteMapping("/{id}")
    public void deleteTagById(@PathVariable Long id) {
         tagService.deleteTagById(id);
    }
}
