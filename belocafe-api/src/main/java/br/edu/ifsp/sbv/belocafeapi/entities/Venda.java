package br.edu.ifsp.sbv.belocafeapi.entities;

import jakarta.persistence.*;
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
public class Venda {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private Long id;

    @NotNull(message = "Data é obrigatório")
    @NotEmpty()
    @Length(max = 13)
    private String data;

    @NotNull(message = "Valor é obrigatório")
    @NotEmpty
    private Double valor;

    @NotNull(message = "Quantidade é obrigatória")
    @NotEmpty
    private Double qtdCafe;

    @NotNull(message = "Gleba é orbigatório")
    @ManyToOne
    private Gleba gleba;

    @NotNull(message = "Usuário é obrigatório")
    @ManyToOne
    private User usuario;

}
