package com.nextlift.SsoService.controller;

import com.nextlift.SsoService.jwtUtils.JwtUtil;
import com.nextlift.SsoService.model.GymUser;
import com.nextlift.SsoService.payload.ResponseC;
import com.nextlift.SsoService.repository.GymUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class GymUserController {

    private final AuthenticationManager authenticationManager;
    private final GymUserRepository userRepository;
    private final PasswordEncoder encoder;
    private final JwtUtil jwtUtils;

    @PostMapping("/signin")
    public ResponseEntity<ResponseC> authenticateUser(@RequestBody GymUser user) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        user.getUsername(),
                        user.getPassword()
                )
        );
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        return ResponseEntity.ok().body( new ResponseC(jwtUtils.generateToken(userDetails.getUsername())));
    }

    @PostMapping("/signup")
    public ResponseEntity<String> registerUser(@RequestBody GymUser user) {
        if (userRepository.existsByUsername(user.getUsername())) {
            return ResponseEntity.badRequest().body("Error: Username is already taken!");
        }
        try {
            GymUser newUser = new GymUser(
                    null,
                    user.getUsername(),
                    encoder.encode(user.getPassword())
            );
            userRepository.save(newUser);

            return ResponseEntity.status(HttpStatus.CREATED).body("User registered successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: Unable to register user.");
        }
    }
}