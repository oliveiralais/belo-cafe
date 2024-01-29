package br.edu.ifsp.sbv.belocafeapi.entities.projections;

import br.edu.ifsp.sbv.belocafeapi.entities.Atividade;
import br.edu.ifsp.sbv.belocafeapi.entities.Beneficiamento;
import org.springframework.data.rest.core.config.Projection;

@Projection(name = "atividadeBeneficiamento", types = {Beneficiamento.class})
public interface atividadeBeneficiamento {
    Long getId();
    Atividade getAtividade();
    String getTipoBeneficiamento();
    Double getRendimento();
}
