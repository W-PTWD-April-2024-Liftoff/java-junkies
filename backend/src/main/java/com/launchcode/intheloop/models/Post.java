package com.launchcode.intheloop.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name ="posts")
@Getter
@Setter
public class Post extends AbstractEntity {

    private String title;
    private String content;

    @OneToMany(mappedBy = "post", cascade = {CascadeType.REMOVE})
    private List<Comment> comments;

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Rating> ratings;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
            name = "post_tags",
            joinColumns = @JoinColumn(name = "post_id"),
            inverseJoinColumns = @JoinColumn(name = "tag_id")
    )
    private List<Tag> tags;

    public Post(){}
}
