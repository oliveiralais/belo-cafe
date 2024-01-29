package br.edu.ifsp.sbv.belocafeapi.entities.projections;

import br.edu.ifsp.sbv.belocafeapi.entities.Atividade;
import br.edu.ifsp.sbv.belocafeapi.entities.Plantio;
import org.springframework.data.rest.core.config.Projection;

@Projection(name = "atividadePlantio", types = {Plantio.class})
public interface atividadePlantio {
    Long getId();
    Atividade getAtividade();
    String getTipoPlantio();
    Double getMassaPlantio();
}
