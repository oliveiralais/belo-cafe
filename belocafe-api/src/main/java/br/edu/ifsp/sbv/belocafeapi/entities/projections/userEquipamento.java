package br.edu.ifsp.sbv.belocafeapi.entities.projections;

import br.edu.ifsp.sbv.belocafeapi.entities.Equipamento;
import br.edu.ifsp.sbv.belocafeapi.entities.User;
import org.springframework.data.rest.core.config.Projection;

import java.time.LocalDate;
@Projection(name = "userEquipamento", types = {Equipamento.class})
public interface userEquipamento {
    Long getId();
    String getNome();
    String getDescricao();
    String getFabricante();
    Integer getAnoFabricacao();
    String getModelo();
    Double getValorCompra();
    LocalDate getDataCompra();
    Double getDepreciacao();
    Double getManutencao();
    User getUsuario();
}
