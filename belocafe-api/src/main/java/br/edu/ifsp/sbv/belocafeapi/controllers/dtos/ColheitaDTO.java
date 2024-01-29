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
public class ColheitaDTO {
    private Long id;
    private Atividade atividade;
    private String tipoColheita;
    private Double massaColhida;
    private Double rendimento;
}
