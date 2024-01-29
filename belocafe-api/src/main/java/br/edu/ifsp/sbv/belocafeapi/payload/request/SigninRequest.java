package br.edu.ifsp.sbv.belocafeapi.payload.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class SigninRequest {
    @NotBlank
    private String email;

    @NotBlank
    private String password;
}
