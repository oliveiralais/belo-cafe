package br.edu.ifsp.sbv.belocafeapi.entities.projections;

import br.edu.ifsp.sbv.belocafeapi.entities.Gasto;
import br.edu.ifsp.sbv.belocafeapi.entities.User;
import org.springframework.data.rest.core.config.Projection;

import java.util.Date;

@Projection(name = "userGasto", types = {Gasto.class})
public interface userGasto {
    Long getId();
    String getType();
    Long getCode();
    String getDescription();
    Double getAmount();
    Date getIssueDate();
    String getName();
    String getCpfCnpj();
    User getUsuario();
}
