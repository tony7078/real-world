package gdsckw.realworldproject.controller;

import gdsckw.realworldproject.dto.*;
import gdsckw.realworldproject.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class SingleUserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<?> getUser(@RequestHeader("Authorization") String jwtToken) {
        try {
            LoginResponse loginResponse = userService.getUserFromJwt(jwtToken);
            // 로그인 성공 응답 반환
            return ResponseEntity.ok(loginResponse);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(2000).body("Invalid JWT token");
        }
    }

    @PutMapping
    public ResponseEntity<?> updateUser(@RequestBody UpdateRequestDto updateRequestDto) {
        System.out.println(updateRequestDto.getUser().getEmail());
        UserResponseDto updatedUserResponseDto = userService.updateUser(updateRequestDto.getUser().getEmail(), updateRequestDto);
        return ResponseEntity.ok(updatedUserResponseDto);
    }
}
