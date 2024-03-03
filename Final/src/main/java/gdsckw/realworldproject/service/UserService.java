package gdsckw.realworldproject.service;

import gdsckw.realworldproject.dto.LoginResponse;
import gdsckw.realworldproject.dto.UpdateRequestDto;
import gdsckw.realworldproject.dto.UserRequestDto;
import gdsckw.realworldproject.dto.UserResponseDto;
import gdsckw.realworldproject.entity.User;
import gdsckw.realworldproject.repository.UserRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    private String secretKey = "iloverealworldprojectingdscinkwuniversity2024";

    public LoginResponse login(String email, String password) throws Exception {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new Exception(email + "를 가진 사용자를 찾을 수 없습니다. "));

        if (!user.getPassword().equals(password)) {
            throw new Exception("비밀번호가 일치하지 않습니다.");
        }

        String token = jwtUtil.createJwt(user.getEmail(), user.getUsername()); // 역할은 예시로 "USER"를 사용합니다.

        // 로그인 응답에 사용자 정보 포함
        LoginResponse loginResponse = new LoginResponse();
        loginResponse.getUser().setEmail(user.getEmail());
        loginResponse.getUser().setToken(token);
        loginResponse.getUser().setUsername(user.getUsername());
        loginResponse.getUser().setBio(user.getBio());
        loginResponse.getUser().setImage(user.getImage());

        return loginResponse;
    }

    public UserResponseDto registerUser(UserRequestDto userRequestDto) {
        User newUser = new User();
        newUser.setUsername(userRequestDto.getUser().getUsername());
        newUser.setEmail(userRequestDto.getUser().getEmail());
        newUser.setPassword(userRequestDto.getUser().getPassword()); // 비밀번호는 암호화하여 저장해야 함
        // newUser.setBio(""); // 초기 bio는 비어 있거나 기본 값을 설정할 수 있음
        // newUser.setImage(null); // 초기 image는 null이거나 기본 값을 설정할 수 있음
        userRepository.save(newUser);

        String token = jwtUtil.createJwt(newUser.getEmail(), newUser.getUsername()); // JWT 토큰 생성 로직

        UserResponseDto.UserDto userDto = new UserResponseDto.UserDto();
        userDto.setEmail(newUser.getEmail());
        userDto.setToken(token);
        userDto.setUsername(newUser.getUsername());
        userDto.setBio(newUser.getBio());
        userDto.setImage(newUser.getImage());

        UserResponseDto responseDto = new UserResponseDto();
        responseDto.setUser(userDto);
        return responseDto;
    }


    public LoginResponse getUserFromJwt(String jwtToken) {
        jwtToken = jwtToken.replace("Bearer ", ""); // "Bearer " 접두사 제거
        SecretKey key = Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));

        // 토큰 파싱 및 검증
        Jws<Claims> jwsClaims = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(jwtToken);


        // 검증된 클레임에서 사용자 정보 추출
        Claims claims = jwsClaims.getBody();
        String username = claims.get("username",String.class); // 'sub' 클레임에서 사용자 이름 추출

        // 데이터베이스에서 사용자 정보 조회
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found with username: " + username));

        // 로그인 응답 객체 생성 및 반환
        LoginResponse loginResponse = new LoginResponse();
        loginResponse.getUser().setEmail(user.getEmail());
        loginResponse.getUser().setUsername(user.getUsername());
        loginResponse.getUser().setBio(user.getBio());
        loginResponse.getUser().setImage(user.getImage());
        loginResponse.getUser().setToken(jwtToken);

        return loginResponse;
    }

    @Transactional
    public UserResponseDto updateUser(String email, UpdateRequestDto updateRequestDto) {
        User user = userRepository.findByEmail(email).orElse(null); // UsernameNotFoundException 대신 null 처리
        if (user != null) {
            user.setBio(updateRequestDto.getUser().getBio());
            user.setImage(updateRequestDto.getUser().getImage());
            // 토큰 및 사용자 이름 업데이트가 필요한 경우 여기에 추가
        }

        // 사용자 업데이트 로직 후 응답 생성 로직
        UserResponseDto.UserDto userDto = new UserResponseDto.UserDto();
        if (user != null) {
            userDto.setEmail(user.getEmail());
            userDto.setUsername(user.getUsername()); // 예제에서는 업데이트 되지 않지만, 필요에 따라 추가
            userDto.setBio(user.getBio());
            userDto.setImage(user.getImage());
            userDto.setToken(jwtUtil.createJwt(user.getEmail(), user.getUsername()));
        }

        UserResponseDto responseDto = new UserResponseDto();
        responseDto.setUser(userDto);
        return responseDto;
    }

    public Optional<User> getUserProfile(String username) {
        return userRepository.findByUsername(username);
    }

    public User findUserByUsername(String username) {
        return userRepository.findByUsername(username).orElse(null);
    }

    public String findUserByJwtToken(String jwtToken) {
        jwtToken = jwtToken.replace("Bearer ", ""); // "Bearer " 접두사 제거
        SecretKey key = Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));

        // 토큰 파싱 및 검증
        Jws<Claims> jwsClaims = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(jwtToken);

        // 검증된 클레임에서 사용자 정보 추출
        Claims claims = jwsClaims.getBody();
        String username = claims.get("username", String.class); // 'sub' 클레임에서 사용자 이름 추출


        return username;
    }

    public User followUser(String currentUsername, String usernameToFollow) {
        User currentUser = userRepository.findByUsername(currentUsername)
                .orElseThrow(() -> new EntityNotFoundException("Current user not found"));

        User userToFollow = userRepository.findByUsername(usernameToFollow)
                .orElseThrow(() -> new EntityNotFoundException("User to follow not found"));

        currentUser.follow(userToFollow);
        userRepository.save(currentUser);

        return userToFollow;
    }

    public boolean isFollowing(String currentUsername, String usernameToCheck) {
        User currentUser = userRepository.findByUsername(currentUsername)
                .orElseThrow(() -> new EntityNotFoundException("Current user not found: " + currentUsername));

        User userToCheck = userRepository.findByUsername(usernameToCheck)
                .orElseThrow(() -> new EntityNotFoundException("User to check not found: " + usernameToCheck));

        return currentUser.getFollowedUsers().contains(userToCheck);
    }

    public void unfollowUser(String currentUsername, String usernameToUnfollow) {
        User currentUser = userRepository.findByUsername(currentUsername)
                .orElseThrow(() -> new EntityNotFoundException("Current user not found: " + currentUsername));

        User userToUnfollow = userRepository.findByUsername(usernameToUnfollow)
                .orElseThrow(() -> new EntityNotFoundException("User to unfollow not found: " + usernameToUnfollow));

        currentUser.getFollowedUsers().remove(userToUnfollow);
        userRepository.save(currentUser);
    }
}
