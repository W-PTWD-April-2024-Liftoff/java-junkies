package com.launchcode.intheloop.models;

import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Comment extends AbstractEntity {

    @Size(min = 1, message = "Comment cannot be blank")
    public String comment;

    @ManyToOne
    private Post post;

    public Comment(){}

}
