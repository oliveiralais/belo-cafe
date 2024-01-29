package br.edu.ifsp.sbv.belocafeapi.entities.projections;

import br.edu.ifsp.sbv.belocafeapi.entities.Insumo;
import br.edu.ifsp.sbv.belocafeapi.entities.TipoInsumo;
import br.edu.ifsp.sbv.belocafeapi.entities.User;
import org.springframework.data.rest.core.config.Projection;

@Projection(name = "tipoInsumo", types = {Insumo.class})
public interface userTipoInsumoInsumo {
    Long getId();
    String getNome();
    String getAlvo();
    String getPrincipioAtivo();
    String getUnidade();
    Double getValor();
    Double getQuantidadeDisponivel();
    Double getQuantidadeAdquirida();
    Double getValorTotal();
    TipoInsumo getTipoInsumo();
    String getDetalhamentoTipo();
    User getUsuario();
}
