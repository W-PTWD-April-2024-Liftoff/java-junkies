package com.launchcode.intheloop.controllers;

import com.launchcode.intheloop.models.Article;
import com.rometools.rome.io.SyndFeedInput;
import com.rometools.rome.io.XmlReader;
import com.rometools.rome.feed.synd.SyndEntry;
import com.rometools.rome.feed.synd.SyndFeed;
import org.springframework.web.bind.annotation.*;

import java.net.URL;
import java.util.*;

@RestController
@RequestMapping("/articles")
public class RssController {

    @GetMapping
    public List<Article> getArticles() {
        List<Article> articles = new ArrayList<>();
        try {
            URL feedUrl = new URL("https://www.freecodecamp.org/news/rss");
            SyndFeedInput input = new SyndFeedInput();
            SyndFeed feed = input.build(new XmlReader(feedUrl));

            for (SyndEntry entry : feed.getEntries()) {
                Article article = new Article();
                article.setTitle(entry.getTitle());
                article.setLink(entry.getLink());
                article.setDescription(entry.getDescription().getValue());
                article.setPubDate(entry.getPublishedDate().toString());
                articles.add(article);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
        return articles;
    }
}

