package com.launchcode.intheloop.models;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Rating {
    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    @JoinColumn(name="post_id", nullable=false)
    @Getter(AccessLevel.NONE)
    private Post post;

    private int rating;

}
