package br.edu.ifsp.sbv.belocafeapi.repositories;

import br.edu.ifsp.sbv.belocafeapi.entities.TipoInsumo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource( collectionResourceRel = "tiposInsumo", path = "tipos-insumo" )
public interface TipoInsumoRepository extends JpaRepository<TipoInsumo, Long> {
}
