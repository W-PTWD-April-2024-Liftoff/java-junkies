package com.launchcode.intheloop.models;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.Setter;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
public class Post extends AbstractEntity {

    @ManyToOne
    private WatchList watchList;

    @JoinColumn(name = "post_id")
    @OneToMany
    private final List<Comment> comments = new ArrayList<>();

    public Post(){}
}
