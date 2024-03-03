package gdsckw.realworldproject.controller;

import gdsckw.realworldproject.service.TagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin
@RestController
@RequestMapping("/api/tags")
public class TagController {
    @Autowired
    private TagService tagService;

    @GetMapping
    public ResponseEntity<?> getTags() {
        List<String> tags = tagService.getAllDistinctTags();
        Map<String, List<String>> response = new HashMap<>();
        response.put("tags", tags);
        return ResponseEntity.ok(response);
    }
}