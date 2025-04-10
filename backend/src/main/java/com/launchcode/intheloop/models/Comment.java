package com.launchcode.intheloop.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name ="comments")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Comment extends AbstractEntity {

    @NotBlank
    private String text;

    private LocalDateTime createdAt = LocalDateTime.now();

    @ManyToOne
    @JoinColumn(name = "post_id")
    @Getter(AccessLevel.NONE)
    private Post post;

}
