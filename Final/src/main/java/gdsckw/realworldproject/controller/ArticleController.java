package gdsckw.realworldproject.controller;

import gdsckw.realworldproject.dto.ArticleResponseDto;
import gdsckw.realworldproject.dto.ArticleUpdateRequestDto;
import gdsckw.realworldproject.dto.CreateArticleRequest;
import gdsckw.realworldproject.entity.Article;
import gdsckw.realworldproject.entity.User;
import gdsckw.realworldproject.service.ArticleService;
import gdsckw.realworldproject.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

@CrossOrigin
@RestController
@RequestMapping("/api/articles")
public class ArticleController {

    @Autowired
    private ArticleService articleService;

    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<?> getArticles(
            @RequestParam(required = false) String tag,
            @RequestParam(required = false) String author,
            @RequestParam(required = false) String favorited,
            @RequestParam(defaultValue = "20") int limit,
            @RequestParam(defaultValue = "0") int offset) {

        Page<ArticleResponseDto> articles = articleService.getArticles(tag, author, favorited, limit, offset);

        // articles 객체를 원하는 응답 형식으로 변환
        Map<String, Object> response = new HashMap<>();
        response.put("articles", articles.getContent());
        response.put("articlesCount", articles.getTotalElements());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/feed")
    public ResponseEntity<?> getUserArticles(
            @RequestHeader("Authorization") String jwtToken,
            @RequestParam(defaultValue = "20") int limit,
            @RequestParam(defaultValue = "0") int offset) {

        // JWT 토큰에서 username 추출
        String username = userService.findUserByJwtToken(jwtToken);
        if (username == null) {
            // JWT 토큰이 유효하지 않거나 사용자를 찾을 수 없는 경우
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid token or user not found");
        }

        // 현재 사용자가 작성한 게시글 조회
        Page<ArticleResponseDto> articles = articleService.getArticlesByCurrentUser(username, limit, offset);

        // 응답 객체 구성
        Map<String, Object> response = new HashMap<>();
        response.put("articles", articles.getContent());
        response.put("articlesCount", articles.getTotalElements());

        return ResponseEntity.ok(response);
    }

    @GetMapping("/{slug}")
    public ResponseEntity<?> getArticleBySlug(@PathVariable String slug) {
        return articleService.getArticleBySlug(slug)
                .map(article -> {
                    Map<String, Object> articleMap = new HashMap<>();
                    articleMap.put("slug", article.getSlug());
                    articleMap.put("title", article.getTitle());
                    articleMap.put("description", article.getDescription());
                    articleMap.put("body", article.getBody());
                    articleMap.put("tagList", article.getTagList());
                    articleMap.put("createdAt", article.getCreatedAt());
                    articleMap.put("updatedAt", article.getUpdatedAt());
                    articleMap.put("favorited", article.isFavorited());
                    articleMap.put("favoritesCount", article.getFavoritesCount());
                    Map<String, Object> authorMap = new HashMap<>();
                    authorMap.put("username", article.getAuthor().getUsername());
                    authorMap.put("bio", article.getAuthor().getBio());
                    authorMap.put("image", article.getAuthor().getImage());
                    authorMap.put("following", false); // 추후
                    articleMap.put("author", authorMap);

                    return ResponseEntity.ok(Collections.singletonMap("article", articleMap));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> createArticle(@RequestBody CreateArticleRequest request, @RequestHeader("Authorization") String jwtToken) {
        String usersname = userService.findUserByJwtToken(jwtToken);
        System.out.println(usersname);
        User author = userService.findUserByUsername(usersname);
        if (author == null) {
            // 사용자를 찾을 수 없는 경우의 처리 로직
            // 예를 들어, 클라이언트에 에러 메시지를 포함한 응답을 반환할 수 있습니다.
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

        Article article = new Article();
        article.setTitle(request.getArticle().getTitle());
        article.setDescription(request.getArticle().getDescription());
        article.setBody(request.getArticle().getBody());
        article.setTagList(request.getArticle().getTagList());
        article.setAuthor(author);
        // slug 생성 로직 (실제 구현에서는 제목으로부터 slug를 생성해야 함)
        article.setSlug(article.getTitle().toLowerCase().replace(" ", "-"));
        article.setCreatedAt(LocalDateTime.now());
        article.setUpdatedAt(LocalDateTime.now());

        Article createdArticle = articleService.createArticle(article);

        // 응답 DTO 생성
        ArticleResponseDto responseDto = new ArticleResponseDto(createdArticle);
        return ResponseEntity.status(HttpStatus.CREATED).body(Collections.singletonMap("article", responseDto));
    }

    @DeleteMapping("/{slug}")
    public ResponseEntity<?> deleteArticle(@PathVariable String slug) {
        articleService.deleteArticleBySlug(slug);
        return ResponseEntity.ok().build(); // 성공적으로 삭제되었을 때의 응답
    }

    @PutMapping("/{slug}")
    public ResponseEntity<ArticleResponseDto> updateArticle(
            @PathVariable String slug,
            @RequestBody ArticleUpdateRequestDto updateRequestDto) {

        Article updatedArticle = articleService.updateArticle(slug, updateRequestDto.getArticle());

        // 업데이트된 게시글 정보로 응답 DTO 생성
        ArticleResponseDto responseDto = new ArticleResponseDto(updatedArticle);

        return ResponseEntity.ok(responseDto);
    }
}
