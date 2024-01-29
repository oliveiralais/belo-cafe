package br.edu.ifsp.sbv.belocafeapi.entities.projections;

import br.edu.ifsp.sbv.belocafeapi.entities.Atividade;
import br.edu.ifsp.sbv.belocafeapi.entities.Pulverizacao;
import org.springframework.data.rest.core.config.Projection;

@Projection(name = "atividadePulverizacao", types = {Pulverizacao.class})
public interface atividadePulverizacao {
    Long getId();
    Atividade getAtividade();
    Long getOcorrenciaAno();
}
