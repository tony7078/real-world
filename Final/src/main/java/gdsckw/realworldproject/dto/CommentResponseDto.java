package gdsckw.realworldproject.dto;

import gdsckw.realworldproject.entity.Comment;

public class CommentResponseDto {
    private Long id;
    private String createdAt;
    private String updatedAt;
    private String body;
    private AuthorDto author;

    public CommentResponseDto(Comment comment) {
        this.id = comment.getId();
        this.createdAt = comment.getCreatedAt().toString();
        this.updatedAt = comment.getUpdatedAt().toString();
        this.body = comment.getBody();
        this.author = new AuthorDto(comment.getAuthor());
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }

    public String getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(String updatedAt) {
        this.updatedAt = updatedAt;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public AuthorDto getAuthor() {
        return author;
    }

    public void setAuthor(AuthorDto author) {
        this.author = author;
    }
}