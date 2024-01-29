package br.edu.ifsp.sbv.belocafeapi.entities.projections;

import br.edu.ifsp.sbv.belocafeapi.entities.User;
import br.edu.ifsp.sbv.belocafeapi.entities.Venda;
import org.springframework.data.rest.core.config.Projection;

@Projection(name = "userVenda", types = {Venda.class})
public interface userVenda {
    Long getId();
    String getData();
    Double getValor();
    Double getQtdCafe();
    User getUser();
}
