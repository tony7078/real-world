package gdsckw.realworldproject.dto;

import gdsckw.realworldproject.entity.Article;

import java.time.LocalDateTime;
import java.util.List;

public class ArticleResponseDto {
    private String slug;
    private String title;
    private String description;
    private String body;
    private List<String> tagList;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private boolean favorited;
    private int favoritesCount;
    private AuthorDto author;

    public ArticleResponseDto(Article article) {
        this.slug = article.getSlug();
        this.title = article.getTitle();
        this.description = article.getDescription();
        this.body = article.getBody();
        this.tagList = article.getTagList();
        this.createdAt = article.getCreatedAt();
        this.updatedAt = article.getUpdatedAt();
        this.favorited = article.isFavorited();
        this.favoritesCount = article.getFavoritesCount();
        this.author = new AuthorDto(article.getAuthor());
    }

    public String getSlug() {
        return slug;
    }

    public void setSlug(String slug) {
        this.slug = slug;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public List<String> getTagList() {
        return tagList;
    }

    public void setTagList(List<String> tagList) {
        this.tagList = tagList;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public boolean isFavorited() {
        return favorited;
    }

    public void setFavorited(boolean favorited) {
        this.favorited = favorited;
    }

    public int getFavoritesCount() {
        return favoritesCount;
    }

    public void setFavoritesCount(int favoritesCount) {
        this.favoritesCount = favoritesCount;
    }

    public AuthorDto getAuthor() {
        return author;
    }

    public void setAuthor(AuthorDto author) {
        this.author = author;
    }
}