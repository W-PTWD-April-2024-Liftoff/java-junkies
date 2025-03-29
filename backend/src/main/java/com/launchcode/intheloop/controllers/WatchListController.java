package com.launchcode.intheloop.controllers;

import com.launchcode.intheloop.models.WatchList;
import com.launchcode.intheloop.service.WatchListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/watchlist")
public class WatchListController {

    @Autowired
    WatchListService watchListService;

    @GetMapping
    public Iterable<WatchList> getAllWatchList () {
        return watchListService.getAllWatchList();
    }

//    @PostMapping
//    public WatchList createWatchList(@RequestBody WatchList watchList) {
//        return watchListService.createWatchList(watchList);
//    }

    @GetMapping("/{id}")
    public Optional<WatchList> getWatchListById (@PathVariable Long id) {
        return watchListService.getWatchListById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteWatchListById (@PathVariable Long id) {
        watchListService.deleteWatchListById(id);
    }

    @PutMapping("/{id}")
    public WatchList updateWatchList (@PathVariable Long id, @RequestBody WatchList updateWatchlist) {
        return watchListService.updateWatchListById(id, updateWatchlist);
    }
}
