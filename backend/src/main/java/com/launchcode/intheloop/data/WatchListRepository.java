package com.launchcode.intheloop.data;

import com.launchcode.intheloop.models.WatchList;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WatchListRepository extends CrudRepository<WatchList, Integer> {
}
