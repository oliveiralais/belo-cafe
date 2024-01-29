package br.edu.ifsp.sbv.belocafeapi.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(uniqueConstraints = {
        @UniqueConstraint(columnNames = "email"),
        @UniqueConstraint(columnNames = "cpfCnpj")
})
@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode( onlyExplicitlyIncluded = true )
public class User {

    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private Long id;

    @NotBlank
    @Size(max = 100)
    private String name;

    @NotBlank
    @Size(max = 200)
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
    @Size(max = 18)
    private String cpfCnpj;

    @NotBlank
    @Size(max = 100)
    private String password;

    @ManyToMany( fetch = FetchType.LAZY )
    @JoinTable( name = "user_roles",
            joinColumns = @JoinColumn( name = "user_id" ),
            inverseJoinColumns = @JoinColumn( name = "role_id" ) )
    private Set<Role> roles = new HashSet<>();
}
