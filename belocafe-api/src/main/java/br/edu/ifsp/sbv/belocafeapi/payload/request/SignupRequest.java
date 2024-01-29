package br.edu.ifsp.sbv.belocafeapi.payload.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.Set;

@Data
public class SignupRequest {
    @NotBlank
    @Size(min = 6, max = 100)
    private String name;

    @NotBlank
    @Size(min = 10, max = 200)
    private String propertyName;

    @NotBlank
    @Size(max = 2)
    private String uf;

    @NotBlank
    @Size(max = 50)
    private String city;

    @NotBlank
    @Size(max = 100)
    private String email;

    @NotBlank
    @Size(min = 14, max = 18)
    private String cpfCnpj;

    @NotBlank
    @Size(min = 5, max = 100)
    private String password;

    @NotBlank
    @Size(min = 5, max = 100)
    private String confirmPassword;

    private Set<String> roles;
}
