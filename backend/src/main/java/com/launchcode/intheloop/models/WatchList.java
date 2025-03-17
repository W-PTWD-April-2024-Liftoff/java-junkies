package com.launchcode.intheloop.models;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
public class WatchList extends AbstractEntity{

    public String savedPosts;

    //may need a list here to store posts
    @JoinColumn(name = "watchlist_id")
    @OneToMany
    private List<Post> posts = new ArrayList<>();

    public WatchList(){}
}
