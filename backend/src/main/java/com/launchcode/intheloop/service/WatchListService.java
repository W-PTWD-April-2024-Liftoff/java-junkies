package com.launchcode.intheloop.service;

import com.launchcode.intheloop.data.WatchListRepository;
import com.launchcode.intheloop.models.Comment;
import com.launchcode.intheloop.models.WatchList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class WatchListService {

    @Autowired
    private WatchListRepository watchListRepository;

//    public WatchList createWatchList(WatchList watchList){
//        if(watchList.getSavedPosts() != null){
//            watchList.setSavedPosts(watchList.getSavedPosts());
//        }
//        return watchListRepository.save(watchList);
//    }

    public Iterable<WatchList> getAllWatchList() {
        return watchListRepository.findAll();
    }

    public Optional<WatchList> getWatchListById(Long id) {
        return watchListRepository.findById(id);
    }

    public void deleteWatchListById(Long id) {
        Optional<WatchList> results = watchListRepository.findById(id);

        if (results.isEmpty()) {
            throw new NoSuchElementException("No watchlist with id: " + id);
        }

        WatchList watchList = results.get();
        watchListRepository.delete(watchList);
    }

    public WatchList updateWatchListById(Long id, WatchList updatedWatchlist) {
        Optional<WatchList> results = watchListRepository.findById(id);

        if(results.isEmpty()) {
            throw new NoSuchElementException("No watchlist with id: " + id);
        }

        WatchList watchList = results.get();
        watchList.setTitle(updatedWatchlist.getTitle());
        watchList.setSavedPosts(updatedWatchlist.getSavedPosts());

        return watchListRepository.save(watchList);
    }

}
