package br.edu.ifsp.sbv.belocafeapi.repositories;

import br.edu.ifsp.sbv.belocafeapi.entities.Adubacao;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource( collectionResourceRel = "adubacoes", path = "adubacoes" )
public interface AdubacaoRepository extends JpaRepository<Adubacao, Long> {
    Page<Adubacao> findByAtividadeUsuarioId(@Param( "user" ) Long user, Pageable pageable );
}
