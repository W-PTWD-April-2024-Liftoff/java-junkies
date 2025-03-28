package com.launchcode.intheloop.service;

import com.launchcode.intheloop.data.WatchListRepository;
import com.launchcode.intheloop.models.WatchList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class WatchListService {

    @Autowired
    private WatchListRepository watchListRepository;

    public Iterable<WatchList> getAllWatchList() {
        return watchListRepository.findAll();
    }

    //id doesn't work for some reason
    public Optional<WatchList> getWatchListById (Long id) {
        return watchListRepository.findById(id);
    }

    public WatchList createWatchList (WatchList watchList) {
            return watchListRepository.save(watchList);
    }

}
