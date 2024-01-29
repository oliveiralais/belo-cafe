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

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode (onlyExplicitlyIncluded = true)
public class Insumo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private Long id;

    @NotNull(message = "Nome é obrigatório")
    @NotEmpty(message = "Nome não pode ser vazio")
    @Length(min = 5, max = 100)
    private String nome;

    @NotNull(message = "Alvo é obrigatório")
    @NotEmpty(message = "Alvo não pode ser vazio")
    @Length(min = 3, max = 100)
    private String alvo;

    @NotNull(message = "Princípio ativo é obrigatório")
    @NotEmpty(message = "Princípio ativo não pode ser vazio")
    @Length(min = 3, max = 100)
    private String principioAtivo;

    @NotNull(message = "Unidade é obrigatório")
    @NotEmpty(message = "Unidade não pode ser vazio")
    @Length(min = 1, max = 20)
    private String unidade;

    @NotNull(message = "Valor é obrigatório")
    @Min(0)
    private Double valor;

    @NotNull(message = "Quantidade adquirida é obrigatório")
    @Min(0)
    private Double quantidadeAdquirida;

    @NotNull(message = "Quantidade adquirida é obrigatório")
    @Min(0)
    private Double quantidadeDisponivel;

    @NotNull(message = "Valor total é obrigatório")
    @Min(0)
    private Double valorTotal;

    @NotNull(message = "Tipo do Insumo é obrigatório")
    @ManyToOne
    private TipoInsumo tipoInsumo;

    private String detalhamentoTipo;

    @NotNull(message = "Usuário é obrigatório")
    @ManyToOne
    private User usuario;
}
