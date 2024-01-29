package br.edu.ifsp.sbv.belocafeapi.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

import java.util.HashSet;
import java.util.Set;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Funcionario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private Long id;

    @NotNull(message = "Nome é obrigatório")
    @NotEmpty(message = "Nome não pode ser vazio")
    @Length(min = 5, max = 100)
    private String nome;

    @NotNull(message = "CPF é obrigatório")
    @NotEmpty(message = "CPF não pode ser vazio")
    @Length(min = 14, max = 14)
    private String cpf;

    @Length(max = 16)
    private String telefone;

    @NotNull(message = "Função é obrigatório")
    @NotEmpty(message = "Função não pode ser vazio")
    @Length(min=3, max = 50)
    private String funcao;

    @NotNull(message = "Salário é obrigatório")
    @Min(0)
    private Double salario;

    @NotNull(message = "Usuário é obrigatório")
    @ManyToOne
    private User usuario;

    @ManyToMany( fetch = FetchType.LAZY )
    @JoinTable( name = "funcionarios_atividade",
            joinColumns = @JoinColumn( name = "funcionario_id" ),
            inverseJoinColumns = @JoinColumn( name = "atividade_id" ) )
    private Set<Atividade> atividades = new HashSet<>();
}
