package gdsckw.realworldproject.controller;

import gdsckw.realworldproject.dto.CommentResponse;
import gdsckw.realworldproject.dto.CommentResponseDto;
import gdsckw.realworldproject.dto.CreateCommentRequest;
import gdsckw.realworldproject.entity.Comment;
import gdsckw.realworldproject.service.CommentService;
import gdsckw.realworldproject.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin
@RestController
@RequestMapping("/api/articles/{slug}/comments")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @Autowired
    private UserService userService;

    @PostMapping
    public ResponseEntity<?> createComment(@RequestHeader("Authorization") String jwtToken, @PathVariable String slug, @RequestBody CreateCommentRequest request) {
        // JWT 토큰에서 username 추출
        String username = userService.findUserByJwtToken(jwtToken);
        if (username == null) {
            // JWT 토큰이 유효하지 않거나 사용자를 찾을 수 없는 경우
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid token or user not found");
        }

        // Comment 객체 생성
        Comment createdComment = commentService.createComment(slug, request.getComment(), username);

        // CommentResponse 생성하여 반환
        CommentResponse response = new CommentResponse(createdComment);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<?> getComments(@PathVariable String slug) {
        List<CommentResponseDto> comments = commentService.getCommentsByArticleSlug(slug);

        Map<String, Object> response = new HashMap<>();
        response.put("comments", comments);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteComment(@PathVariable String slug, @PathVariable Long id) {
        // 실제 애플리케이션에서는 'slug'를 사용하여 추가 검증을 수행할 수 있습니다.
        // 예를 들어, 삭제하려는 댓글이 해당 게시글에 속하는지 확인할 수 있습니다.

        commentService.deleteComment(id);

        // 성공적으로 삭제되었다는 응답을 반환합니다.
        return ResponseEntity.ok().build();
    }
}
