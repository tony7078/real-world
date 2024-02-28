package gdsckw.realworldproject.controller;

import gdsckw.realworldproject.dto.ProfileResponseDto;
import gdsckw.realworldproject.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/profiles")
public class ProfileController {

    @Autowired
    private UserService userService;

    @GetMapping("/{username}")
    public ResponseEntity<ProfileResponseDto> getProfile(@PathVariable String username) {
        return userService.getUserProfile(username)
                .map(user -> new ProfileResponseDto(
                        new ProfileResponseDto.ProfileDto(
                                user.getUsername(),
                                user.getBio(),
                                user.getImage(),
                                false //추후
                        )))
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
