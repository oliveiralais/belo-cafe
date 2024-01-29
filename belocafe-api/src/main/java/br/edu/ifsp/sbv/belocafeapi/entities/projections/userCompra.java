package br.edu.ifsp.sbv.belocafeapi.entities.projections;

import br.edu.ifsp.sbv.belocafeapi.entities.CompraExt;
import br.edu.ifsp.sbv.belocafeapi.entities.User;
import org.springframework.data.rest.core.config.Projection;

@Projection(name = "userCompra", types = {CompraExt.class})
public interface userCompra {

    Long getId();
    String getTitulo();
    String getDescricao();
    String getData();
    User getUsuario();
}
