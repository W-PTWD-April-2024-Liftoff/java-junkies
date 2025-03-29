package com.launchcode.intheloop.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name ="tags")
@Getter
@Setter
public class Tag extends AbstractEntity {

    private String name;

    @ManyToMany(mappedBy = "tags")
    private List<Post> posts;

    public Tag(){}
}
