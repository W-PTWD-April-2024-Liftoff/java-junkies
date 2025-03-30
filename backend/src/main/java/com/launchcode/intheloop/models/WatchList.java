package com.launchcode.intheloop.models;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
public class WatchList extends AbstractEntity{

    @Getter
    @Setter
    public String title;

    @Getter
    @Setter
    public String savedPosts;

    //may need a list here to store posts
    @Getter
    @Setter
    @JoinColumn(name = "watchlist_id")
    @OneToMany
    private List<Post> posts = new ArrayList<>();

    public WatchList(){}
}