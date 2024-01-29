package br.edu.ifsp.sbv.belocafeapi.repositories;

import br.edu.ifsp.sbv.belocafeapi.entities.Irrigacao;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource( collectionResourceRel = "irrigacoes", path = "irrigacoes" )
public interface IrrigacaoRepository extends JpaRepository<Irrigacao, Long> {
    Page<Irrigacao> findByAtividadeUsuarioId(@Param( "user" ) Long user, Pageable pageable );
}
