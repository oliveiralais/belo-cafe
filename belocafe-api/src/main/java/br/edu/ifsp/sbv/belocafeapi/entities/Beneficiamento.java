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
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Beneficiamento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private Long id;

    @NotNull(message = "Atividade é obrigatório")
    @OneToOne
    private Atividade atividade;

    @NotNull(message = "Tipo do beneficiamento é obrigatório")
    @NotEmpty(message = "Tipo do beneficiamento não pode ser vazio")
    @Length(min = 3, max = 100)
    private String tipoBeneficiamento;

    @NotNull(message = "Rendimento é obrigatório")
    @Min(0)
    private Double rendimento;
}
