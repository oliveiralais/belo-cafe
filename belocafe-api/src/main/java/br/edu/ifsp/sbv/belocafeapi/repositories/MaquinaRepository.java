package br.edu.ifsp.sbv.belocafeapi.repositories;

import br.edu.ifsp.sbv.belocafeapi.entities.Maquina;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource( collectionResourceRel = "maquinas", path = "maquinas" )
public interface MaquinaRepository extends JpaRepository<Maquina, Long> {
    Page<Maquina> findById(@Param("id") Long id, Pageable pageable);
    Page<Maquina> findByNomeContainingAndUsuarioId(@Param("nome") String nome, @Param("id") Long id, Pageable pageable);
    Page<Maquina> findByFabricanteContainingAndUsuarioId(@Param("fabricante") String fabricante, @Param("id") Long id, Pageable pageable);
    Page<Maquina> findByModeloContainingAndUsuarioId(@Param("modelo") String modelo, @Param("id") Long id, Pageable pageable);
    Page<Maquina> findByUsuarioId(@Param("id") Long id, Pageable pageable);
    List<Maquina> getAllByUsuarioId(@Param("id") Long id);
}
