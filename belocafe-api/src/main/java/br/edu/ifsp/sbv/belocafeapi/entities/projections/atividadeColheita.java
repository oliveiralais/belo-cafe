package br.edu.ifsp.sbv.belocafeapi.entities.projections;

import br.edu.ifsp.sbv.belocafeapi.entities.Atividade;
import br.edu.ifsp.sbv.belocafeapi.entities.Colheita;
import org.springframework.data.rest.core.config.Projection;

@Projection(name = "atividadeColheita", types = {Colheita.class})
public interface atividadeColheita {
    Long getId();
    Atividade getAtividade();
    String getTipoColheita();
    Double getMassaColhida();
    Double getRendimento();
}
