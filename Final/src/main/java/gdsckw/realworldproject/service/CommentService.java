package gdsckw.realworldproject.service;

import gdsckw.realworldproject.dto.CommentResponse;
import gdsckw.realworldproject.dto.CommentResponseDto;
import gdsckw.realworldproject.dto.CreateCommentRequest;
import gdsckw.realworldproject.entity.Article;
import gdsckw.realworldproject.entity.Comment;
import gdsckw.realworldproject.entity.User;
import gdsckw.realworldproject.repository.ArticleRepository;
import gdsckw.realworldproject.repository.CommentRepository;
import gdsckw.realworldproject.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private ArticleRepository articleRepository;

    @Autowired
    private UserRepository userRepository;

    public Comment createComment(String slug, CreateCommentRequest.CommentDto commentDto, String username) {
        // Article 찾기
        Article article = articleRepository.findBySlug(slug)
                .orElseThrow(() -> new RuntimeException("Article not found"));

        // User 찾기
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Comment 객체 생성
        Comment comment = new Comment();
        comment.setBody(commentDto.getBody());
        comment.setCreatedAt(LocalDateTime.now());
        comment.setUpdatedAt(LocalDateTime.now());
        comment.setAuthor(user);
        comment.setArticle(article);

        // Comment 저장
        Comment savedComment = commentRepository.save(comment);

        // CommentResponse 생성하여 반환
        return savedComment;
    }

    public List<CommentResponseDto> getCommentsByArticleSlug(String slug) {
        List<Comment> comments = commentRepository.findByArticleSlug(slug);
        return comments.stream()
                .map(CommentResponseDto::new)
                .collect(Collectors.toList());
    }

    public void deleteComment(Long commentId) {
        // 댓글 존재 여부 확인 후 삭제
        if (commentRepository.existsById(commentId)) {
            commentRepository.deleteById(commentId);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Comment not found");
        }
    }
}