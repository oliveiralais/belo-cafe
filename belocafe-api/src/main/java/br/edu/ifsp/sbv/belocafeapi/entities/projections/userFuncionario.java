package br.edu.ifsp.sbv.belocafeapi.entities.projections;

import br.edu.ifsp.sbv.belocafeapi.entities.Funcionario;
import br.edu.ifsp.sbv.belocafeapi.entities.Gleba;
import br.edu.ifsp.sbv.belocafeapi.entities.User;
import org.springframework.data.rest.core.config.Projection;

@Projection(name = "userFuncionario", types = {Funcionario.class})
public interface userFuncionario {
    Long getId();
    String getNome();
    String getCpf();
    String getTelefone();
    String getFuncao();
    Double getSalario();
    User getUsuario();
}
