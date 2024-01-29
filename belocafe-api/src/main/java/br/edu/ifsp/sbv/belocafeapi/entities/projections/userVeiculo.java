package br.edu.ifsp.sbv.belocafeapi.entities.projections;

import br.edu.ifsp.sbv.belocafeapi.entities.User;
import br.edu.ifsp.sbv.belocafeapi.entities.Veiculo;
import org.springframework.data.rest.core.config.Projection;

import java.time.LocalDate;

@Projection(name = "userVeiculo", types = {Veiculo.class})
public interface userVeiculo {
    Long getId();
    String getNome();
    String getIdentificacao();
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
