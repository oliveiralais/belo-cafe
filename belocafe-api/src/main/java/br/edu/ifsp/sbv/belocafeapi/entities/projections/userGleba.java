package br.edu.ifsp.sbv.belocafeapi.entities.projections;

import br.edu.ifsp.sbv.belocafeapi.entities.Gleba;
import br.edu.ifsp.sbv.belocafeapi.entities.User;
import org.springframework.data.rest.core.config.Projection;

@Projection(name = "userGleba", types = {Gleba.class})
public interface userGleba {

    Long getId();
    String getName();
    double getArea();
    double getHorizontalSpacing();
    double getVerticalSpacing();
    Long getPlants();
    String getVariety();
    Long getAltitude();
    User getProprietary();

}
