package gdsckw.realworldproject.service;


import gdsckw.realworldproject.repository.ArticleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class TagService {
    private final ArticleRepository articleRepository;

    @Autowired
    public TagService(ArticleRepository articleRepository) {
        this.articleRepository = articleRepository;
    }

    public List<String> getAllDistinctTags() {
        return articleRepository.findAllDistinctTags();
    }
}