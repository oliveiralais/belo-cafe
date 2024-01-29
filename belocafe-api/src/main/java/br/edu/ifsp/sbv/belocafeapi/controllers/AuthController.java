package br.edu.ifsp.sbv.belocafeapi.controllers;

import br.edu.ifsp.sbv.belocafeapi.entities.ERole;
import br.edu.ifsp.sbv.belocafeapi.entities.Role;
import br.edu.ifsp.sbv.belocafeapi.entities.User;
import br.edu.ifsp.sbv.belocafeapi.payload.request.SigninRequest;
import br.edu.ifsp.sbv.belocafeapi.payload.request.SignupRequest;
import br.edu.ifsp.sbv.belocafeapi.payload.response.JwtResponse;
import br.edu.ifsp.sbv.belocafeapi.payload.response.MessageResponse;
import br.edu.ifsp.sbv.belocafeapi.repositories.RoleRepository;
import br.edu.ifsp.sbv.belocafeapi.repositories.UserRepository;
import br.edu.ifsp.sbv.belocafeapi.security.jwt.JwtUtils;
import br.edu.ifsp.sbv.belocafeapi.security.services.UserDetailsImpl;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepo;

    @Autowired
    RoleRepository roleRepo;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody SigninRequest signinRequest){
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(signinRequest.getEmail(), signinRequest.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        List<String> roles = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .toList();

        return ResponseEntity.ok(new JwtResponse(
                jwt,
                userDetails.getId(),
                userDetails.getEmail(),
                roles
        ));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> register(@Valid @RequestBody SignupRequest signupRequest){
        if(userRepo.existsByEmail(signupRequest.getEmail())){
            return ResponseEntity.badRequest().body(new MessageResponse("Erro: Email já cadastrado!"));
        }

        if(userRepo.existsByCpfCnpj(signupRequest.getCpfCnpj())){
            return ResponseEntity.badRequest().body(new MessageResponse("Erro: CPF/CNPJ já cadastrado!"));
        }

        if(!Objects.equals(signupRequest.getPassword(), signupRequest.getConfirmPassword())){
            return ResponseEntity.badRequest().body(new MessageResponse("Erro: Senhas não coincidem!"));
        }

        User user = new User();

        user.setName(signupRequest.getName());
        user.setPropertyName(signupRequest.getPropertyName());
        user.setUf(signupRequest.getUf());
        user.setCity(signupRequest.getCity());
        user.setCpfCnpj(signupRequest.getCpfCnpj());
        user.setEmail(signupRequest.getEmail());
        user.setPassword(encoder.encode(signupRequest.getPassword()));

        Set<String> rolesStr = signupRequest.getRoles();
        Set<Role> roles = new HashSet<>();

        Role userRole = roleRepo.findByName(ERole.ROLE_USER)
                .orElseThrow( () -> new RuntimeException("Erro: Função não encontrada!"));

        if(rolesStr == null){
            roles.add(userRole);
        } else {

            rolesStr.forEach(role -> {
                switch(role){
                    case "admin":
                        Role adminRole = roleRepo.findByName(ERole.ROLE_ADMIN)
                                .orElseThrow(() -> new RuntimeException("Erro: Função não encontrada!"));
                        roles.add(adminRole);
                        break;

                    default:
                        roles.add(userRole);
                }
            });
        }

        user.setRoles(roles);

        userRepo.save(user);

        return ResponseEntity.ok(new MessageResponse("Usuário cadastrado com sucesso!"));
    }

}
