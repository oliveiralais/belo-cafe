package br.edu.ifsp.sbv.belocafeapi.entities.projections;


import br.edu.ifsp.sbv.belocafeapi.entities.Gleba;
import org.springframework.data.rest.core.config.Projection;

@Projection(name = "glebaVenda", types = {Gleba.class})
public interface glebaVenda {

    Long getId();
    String getTitulo();
    String getDescricao();
    String getData();
    Gleba getGleba();
}
