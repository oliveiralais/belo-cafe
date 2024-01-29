package br.edu.ifsp.sbv.belocafeapi.repositories;

import br.edu.ifsp.sbv.belocafeapi.entities.Plantio;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource( collectionResourceRel = "plantios", path = "plantios" )
public interface PlantioRepository extends JpaRepository<Plantio, Long> {
    Page<Plantio> findByAtividadeUsuarioId(@Param( "user" ) Long user, Pageable pageable );
}
