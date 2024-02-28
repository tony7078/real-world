package gdsckw.realworldproject.controller;

import gdsckw.realworldproject.dto.*;
import gdsckw.realworldproject.entity.User;
import gdsckw.realworldproject.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {
        try {
            // UserService를 통해 로그인 처리
            System.out.println(loginRequest.getUser().getEmail());
            LoginResponse loginResponse = userService.login(loginRequest.getUser().getEmail(), loginRequest.getUser().getPassword());
            // 로그인 성공 응답 반환
            return ResponseEntity.ok(loginResponse);
        } catch (Exception e) {
            // 예외 처리 (예: 사용자를 찾을 수 없거나 비밀번호가 일치하지 않는 경우)
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping
    public ResponseEntity<UserResponseDto> registerUser(@RequestBody UserRequestDto requestDto) {
        UserResponseDto responseDto = userService.registerUser(requestDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(responseDto);
    }

}