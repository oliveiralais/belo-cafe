package br.edu.ifsp.sbv.belocafeapi.repositories;

import br.edu.ifsp.sbv.belocafeapi.entities.TipoAtividade;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource( collectionResourceRel = "tiposAtividade", path = "tipos-atividade" )
public interface TipoAtividadeRepository extends JpaRepository<TipoAtividade, Long> {
}
