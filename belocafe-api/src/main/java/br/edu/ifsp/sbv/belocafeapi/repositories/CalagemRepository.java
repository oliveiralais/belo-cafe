package br.edu.ifsp.sbv.belocafeapi.repositories;

import br.edu.ifsp.sbv.belocafeapi.entities.Calagem;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource( collectionResourceRel = "calagens", path = "calagens" )
public interface CalagemRepository extends JpaRepository<Calagem, Long> {
    Page<Calagem> findByAtividadeUsuarioId(@Param( "user" ) Long user, Pageable pageable );
}
