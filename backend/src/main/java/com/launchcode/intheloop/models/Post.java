package com.launchcode.intheloop.models;

import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Post extends AbstractEntity {

    @ManyToOne
    private WatchList watchList;

    public Post(){}
}
