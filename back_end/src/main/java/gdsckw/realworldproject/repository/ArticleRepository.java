package gdsckw.realworldproject.repository;
import gdsckw.realworldproject.entity.Article;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ArticleRepository extends JpaRepository<Article, Long> {
    Page<Article> findByTagListContaining(String tag, Pageable pageable);
    Page<Article> findByAuthorUsername(String username, Pageable pageable);
    Optional<Article> findBySlug(String slug);
    void deleteBySlug(String slug);
}
