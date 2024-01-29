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
public class Gleba {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private Long id;

    @NotNull(message = "Nome é obrigatório")
    @NotEmpty(message = "Nome não pode ser vazio")
    @Length(min = 5, max = 100)
    private String name;

    @NotNull(message = "Área é obrigatória")
    @Min(0)
    private double area;

    @NotNull(message = "Espaçamento horizontal é obrigatório")
    @Min(0)
    private double horizontalSpacing;

    @NotNull(message = "Espaçamento vertical é obrigatório")
    @Min(0)
    private double verticalSpacing;

    @NotNull(message = "Número de plantas é obrigatório")
    @Min(0)
    private Long plants;

    @NotNull(message = "Cultivar é obrigatório")
    @NotEmpty(message = "Cultivar não pode ser vazio")
    @Length(min = 5, max = 100)
    private String variety;

    @NotNull(message = "Altitude é obrigatório")
    @Min(0)
    private Long altitude;

    @NotNull(message = "Proprietário é obrigatório")
    @ManyToOne
    private User proprietary;

}
