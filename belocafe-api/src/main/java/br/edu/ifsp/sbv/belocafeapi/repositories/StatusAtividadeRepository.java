package br.edu.ifsp.sbv.belocafeapi.repositories;

import br.edu.ifsp.sbv.belocafeapi.entities.StatusAtividade;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource( collectionResourceRel = "statusAtividades", path = "status-atividades" )
public interface StatusAtividadeRepository extends JpaRepository<StatusAtividade, Long> {
}
