package gdsckw.realworldproject.service;

import gdsckw.realworldproject.dto.ArticleResponseDto;
import gdsckw.realworldproject.dto.ArticleUpdateRequestDto;
import gdsckw.realworldproject.entity.Article;
import gdsckw.realworldproject.entity.User;
import gdsckw.realworldproject.repository.ArticleRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ArticleService {

    @Autowired
    private ArticleRepository articleRepository;

    public Page<ArticleResponseDto> getArticles(String tag, String author, String favorited, int limit, int offset) {
        Pageable pageable = PageRequest.of(offset / limit, limit);
        Page<Article> articles;

        if (tag != null) {
            articles = articleRepository.findByTagListContaining(tag, pageable);
        } else if (author != null) {
            articles = articleRepository.findByAuthorUsername(author, pageable);
        } else {
            articles = articleRepository.findAll(pageable);
        }

        // Article 엔티티를 ArticleResponseDto로 변환
        List<ArticleResponseDto> dtos = articles.getContent().stream()
                .map(article -> new ArticleResponseDto(article))
                .collect(Collectors.toList());

        // 변환된 DTO를 포함하는 새 Page 객체 생성
        return new PageImpl<>(dtos, pageable, articles.getTotalElements());
    }

    public Page<ArticleResponseDto> getArticlesByCurrentUser(String username, int limit, int offset) {
        Pageable pageable = PageRequest.of(offset / limit, limit);
        Page<Article> articles = articleRepository.findByAuthorUsername(username, pageable);

        List<ArticleResponseDto> dtos = articles.getContent().stream()
                .map(ArticleResponseDto::new) // 이 부분은 ArticleResponseDto 생성자가 Article을 받을 수 있어야 합니다.
                .collect(Collectors.toList());

        return new PageImpl<>(dtos, pageable, articles.getTotalElements());
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

    public Article favoriteArticle(String slug, String username) {
        Article article = articleRepository.findBySlug(slug)
                .orElseThrow(() -> new EntityNotFoundException("Article not found"));

        // 좋아요 로직 구현, 예를 들어 favoritesCount 증가
        article.setFavoritesCount(article.getFavoritesCount() + 1);
        // 좋아요 누른 사용자 목록에 사용자 추가 로직 구현 (생략)

        return articleRepository.save(article);
    }
}

