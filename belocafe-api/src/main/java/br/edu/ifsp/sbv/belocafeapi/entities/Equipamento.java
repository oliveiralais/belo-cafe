package br.edu.ifsp.sbv.belocafeapi.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Equipamento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private Long id;

    @NotNull(message = "Nome é obrigatório")
    @NotEmpty(message = "Nome não pode ser vazio")
    @Length(min = 3, max = 100)
    private String nome;

    @NotNull(message = "Descricao é obrigatório")
    @NotEmpty(message = "Descricao não pode ser vazio")
    @Length(min = 3, max = 50)
    private String descricao;

    @NotNull(message = "Fabricante é obrigatório")
    @NotEmpty(message = "Fabricante não pode ser vazio")
    @Length(min = 3, max = 100)
    private String fabricante;

    @Min(0)
    private Integer anoFabricacao;

    @NotNull(message = "Modelo é obrigatório")
    @NotEmpty(message = "Modelo não pode ser vazio")
    @Length(min = 3, max = 100)
    private String modelo;

    @Min(0)
    private Double valorCompra;

    @NotNull
    private LocalDate dataCompra;

    @Min(0)
    private Double depreciacao;

    @Min(0)
    private Double manutencao;

    @NotNull(message = "Usuário é obrigatório")
    @ManyToOne
    private User usuario;

    @ManyToMany( fetch = FetchType.LAZY )
    @JoinTable( name = "equipamentos_atividade",
            joinColumns = @JoinColumn( name = "equipamento_id" ),
            inverseJoinColumns = @JoinColumn( name = "atividade_id" ) )
    private Set<Atividade> atividades = new HashSet<>();
}
