package br.edu.ifsp.sbv.belocafeapi.entities.projections;

import br.edu.ifsp.sbv.belocafeapi.entities.Atividade;
import br.edu.ifsp.sbv.belocafeapi.entities.Calagem;
import org.springframework.data.rest.core.config.Projection;

@Projection(name = "atividadeCalagem", types = {Calagem.class})
public interface atividadeCalagem {
    Long getId();
    Atividade getAtividade();
    String getTipoCalcario();
    Double getQtdeCalcario();
}
