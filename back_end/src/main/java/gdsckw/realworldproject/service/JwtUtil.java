package gdsckw.realworldproject.service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtUtil {


    private String secretKey = "iloverealworldprojectingdscinkwuniversity2024";


    public String createJwt(String username, String role) {
        SecretKey key = Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));
        Map<String, Object> claims = new HashMap<>();
        claims.put("username", role);

        //long nowMillis = System.currentTimeMillis();
        //long expMillis = nowMillis + expiration;
       // Date exp = new Date(expMillis);

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(username)
                //.setIssuedAt(new Date(nowMillis))
                //.setExpiration(exp)
                .signWith(SignatureAlgorithm.HS256, key)
                .compact();
    }
}