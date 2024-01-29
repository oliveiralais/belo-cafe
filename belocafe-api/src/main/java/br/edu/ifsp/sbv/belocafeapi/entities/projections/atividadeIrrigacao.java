package br.edu.ifsp.sbv.belocafeapi.entities.projections;

import br.edu.ifsp.sbv.belocafeapi.entities.Atividade;
import br.edu.ifsp.sbv.belocafeapi.entities.Irrigacao;
import org.springframework.data.rest.core.config.Projection;

@Projection(name = "atividadeIrrigacao", types = {Irrigacao.class})
public interface atividadeIrrigacao {
    Long getId();
    Atividade getAtividade();
    String getTipoIrrigacao();
    Boolean getFertirrigacao();
}
