package br.edu.ifsp.sbv.belocafeapi.repositories;

import br.edu.ifsp.sbv.belocafeapi.entities.Beneficiamento;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource( collectionResourceRel = "beneficiamentos", path = "beneficiamentos" )
public interface BeneficiamentoRepository extends JpaRepository<Beneficiamento, Long> {
    Page<Beneficiamento> findByAtividadeUsuarioId(@Param( "user" ) Long user, Pageable pageable );
}
