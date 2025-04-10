package com.launchcode.intheloop.data;

import com.launchcode.intheloop.models.Rating;
import org.springframework.data.repository.CrudRepository;

public interface RatingRepository extends CrudRepository<Rating, Long> {
}
