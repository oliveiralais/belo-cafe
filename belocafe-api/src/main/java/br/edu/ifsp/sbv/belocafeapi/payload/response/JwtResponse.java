package br.edu.ifsp.sbv.belocafeapi.payload.response;

import lombok.Data;

import java.util.List;

@Data
public class JwtResponse {
    private String accessToken;
    private Long id;
    private String email;
    private List<String> roles;

    public JwtResponse(String accessToken, Long id, String email, List<String> roles){
        this.accessToken = accessToken;
        this.id = id;
        this.email = email;
        this.roles = roles;
    }
}
