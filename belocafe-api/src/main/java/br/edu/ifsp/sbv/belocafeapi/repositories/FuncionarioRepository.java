package br.edu.ifsp.sbv.belocafeapi.repositories;

import br.edu.ifsp.sbv.belocafeapi.entities.Funcionario;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource( collectionResourceRel = "funcionarios", path = "funcionarios" )
public interface FuncionarioRepository extends JpaRepository<Funcionario, Long> {
    Page<Funcionario> findById(@Param( "id" ) Long id, Pageable pageable );
    Page<Funcionario> findByNomeContainingAndUsuarioId(@Param("nome") String nome, @Param("id") Long id, Pageable pageable);
    Page<Funcionario> findByUsuarioId(@Param("id") Long id, Pageable pageable);
    List<Funcionario> getAllByUsuarioId(@Param("id") Long id);
}
