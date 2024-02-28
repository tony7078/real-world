package gdsckw.realworldproject.service;

import gdsckw.realworldproject.dto.ArticleUpdateRequestDto;
import gdsckw.realworldproject.entity.Article;
import gdsckw.realworldproject.repository.ArticleRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class ArticleService {

    @Autowired
    private ArticleRepository articleRepository;

    public Page<Article> getArticles(String tag, String author, String favorited, int limit, int offset) {
        Pageable pageable = PageRequest.of(offset / limit, limit);
        if (tag != null) {
            return articleRepository.findByTagListContaining(tag, pageable);
        } else if (author != null) {
            return articleRepository.findByAuthorUsername(author, pageable);
        }
        // favorited와 다른 조건에 따른 필터링 로직 추가
        return articleRepository.findAll(pageable);
    }

    public Optional<Article> getArticleBySlug(String slug) {
        return articleRepository.findBySlug(slug);
    }

    public Article createArticle(Article article) {
        article.setCreatedAt(LocalDateTime.now());
        article.setUpdatedAt(LocalDateTime.now());
        return articleRepository.save(article);
    }

    @Transactional
    public void deleteArticleBySlug(String slug) {
        articleRepository.deleteBySlug(slug);
    }

    @Transactional
    public Article updateArticle(String slug, ArticleUpdateRequestDto.ArticleDto updateDto) {
        Article article = articleRepository.findBySlug(slug)
                .orElseThrow(() -> new EntityNotFoundException("Article not found with slug: " + slug));

        // 업데이트할 필드가 있으면 설정
        if (updateDto.getTitle() != null) {
            article.setTitle(updateDto.getTitle());
        }
        if (updateDto.getDescription() != null) {
            article.setDescription(updateDto.getDescription());
        }
        if (updateDto.getBody() != null) {
            article.setBody(updateDto.getBody());
        }
        // 태그 리스트 및 기타 필드 업데이트 로직 추가 가능

        return articleRepository.save(article);
    }
}

