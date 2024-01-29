package br.edu.ifsp.sbv.belocafeapi.entities.projections;

import br.edu.ifsp.sbv.belocafeapi.entities.*;
import org.springframework.data.rest.core.config.Projection;

import java.time.LocalDate;
import java.util.Set;

@Projection(name = "userAtividade", types = {Atividade.class})
public interface userAtividade {
    Long getId();
    Insumo getInsumo();
    Double getQtdeInsumo();
    Double getCustoInsumos();
    TipoAtividade getTipoAtividade();
    Gleba getLocal();
    Set<Funcionario> getFuncionarios();
    Double getCustoFuncionarios();
    Set<Maquina> getMaquinas();
    Double getCustoMaquinas();
    Set<Equipamento> getEquipamentos();
    Double getCustoEquipamentos();
    Set<Veiculo> getVeiculos();
    Double getCustoVeiculos();
    StatusAtividade getStatusAtividade();
    LocalDate getDataInicio();
    LocalDate getDataFim();
    Double getDespesasExtras();
    Double getCustoPrevisto();
    String getObservacoes();
    User getUsuario();
}
