package gdsckw.realworldproject.controller;

import gdsckw.realworldproject.dto.ProfileResponseDto;
import gdsckw.realworldproject.dto.UserResponseDto;
import gdsckw.realworldproject.entity.User;
import gdsckw.realworldproject.repository.UserRepository;
import gdsckw.realworldproject.service.UserService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin
@RestController
@RequestMapping("/api/profiles")
public class ProfileController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

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

    @PostMapping("/{username}/follow")
    public ResponseEntity<?> followUser(@RequestHeader("Authorization") String jwtToken, @PathVariable String username) {
        // JWT 토큰에서 username 추출
        String currentUsername = userService.findUserByJwtToken(jwtToken);
        if (username == null) {
            // JWT 토큰이 유효하지 않거나 사용자를 찾을 수 없는 경우
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid token or user not found");
        }

        // 팔로우 실행
        userService.followUser(currentUsername, username);

        // 팔로잉 상태 확인
        boolean isFollowing = userService.isFollowing(currentUsername, username);

        // 대상 사용자 정보 조회
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new EntityNotFoundException("User not found: " + username));

        // ProfileResponseDto 생성
        ProfileResponseDto.ProfileDto profileDto = new ProfileResponseDto.ProfileDto(
                user.getUsername(),
                user.getBio(),
                user.getImage(),
                isFollowing
        );

        ProfileResponseDto profileResponseDto = new ProfileResponseDto(profileDto);

        return ResponseEntity.ok(profileResponseDto);

    }

    @DeleteMapping("/{username}/follow")
    public ResponseEntity<?> unfollowUser(@PathVariable String username, @RequestHeader("Authorization") String jwtToken) {
        // JWT 토큰에서 username 추출
        String currentUsername = userService.findUserByJwtToken(jwtToken);
        if (username == null) {
            // JWT 토큰이 유효하지 않거나 사용자를 찾을 수 없는 경우
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid token or user not found");
        }

        // 언팔로우 실행
        userService.unfollowUser(currentUsername, username);

        // 언팔로잉 상태 확인 (언팔로우 후 false로 설정)
        boolean isFollowing = userService.isFollowing(currentUsername, username);

        // 대상 사용자 정보 조회
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new EntityNotFoundException("User not found: " + username));

        // ProfileResponseDto 생성
        ProfileResponseDto.ProfileDto profileDto = new ProfileResponseDto.ProfileDto(
                user.getUsername(),
                user.getBio(),
                user.getImage(),
                isFollowing // 언팔로우 후 false
        );

        ProfileResponseDto profileResponseDto = new ProfileResponseDto(profileDto);

        return ResponseEntity.ok(profileResponseDto);
    }
}
