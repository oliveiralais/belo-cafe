package br.edu.ifsp.sbv.belocafeapi.entities.projections;

import br.edu.ifsp.sbv.belocafeapi.entities.Adubacao;
import br.edu.ifsp.sbv.belocafeapi.entities.Atividade;
import org.springframework.data.rest.core.config.Projection;

@Projection(name = "atividadeAdubacao", types = {Adubacao.class})
public interface atividadeAdubacao {
    Long getId();
    Atividade getAtividade();
    Long getOcorrenciaAno();
}
