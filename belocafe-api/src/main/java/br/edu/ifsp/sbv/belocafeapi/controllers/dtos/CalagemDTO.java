package br.edu.ifsp.sbv.belocafeapi.controllers.dtos;

import br.edu.ifsp.sbv.belocafeapi.entities.Atividade;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode( onlyExplicitlyIncluded = true )
public class CalagemDTO {
    private Long id;
    private Atividade atividade;
    private String tipoCalcario;
    private Double qtdeCalcario;
}
