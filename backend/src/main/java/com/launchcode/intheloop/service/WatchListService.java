package com.launchcode.intheloop.service;

import com.launchcode.intheloop.data.WatchListRepository;
import com.launchcode.intheloop.models.Post;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class WatchListService {

    @Autowired
    private WatchListRepository watchListRepository;
}
