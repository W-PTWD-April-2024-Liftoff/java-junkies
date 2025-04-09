package com.launchcode.intheloop.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name ="comments")
public class Comment extends AbstractEntity {

    @Getter
    @Setter
    private String text;

    @Getter
    @Setter
    private LocalDateTime createdAt = LocalDateTime.now();

    @ManyToOne
    @JoinColumn(name = "post_id")
    @Getter
    @Setter
    private Post post;
}
