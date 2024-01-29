package br.edu.ifsp.sbv.belocafeapi.repositories;

import br.edu.ifsp.sbv.belocafeapi.entities.Equipamento;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource( collectionResourceRel = "equipamentos", path = "equipamentos" )
public interface EquipamentoRepository extends JpaRepository<Equipamento, Long> {
    Page<Equipamento> findById(@Param("id") Long id, Pageable pageable);
    Page<Equipamento> findByNomeContainingAndUsuarioId(@Param("nome") String nome, @Param("id") Long id, Pageable pageable);
    Page<Equipamento> findByFabricanteContainingAndUsuarioId(@Param("fabricante") String fabricante, @Param("id") Long id, Pageable pageable);
    Page<Equipamento> findByModeloContainingAndUsuarioId(@Param("modelo") String modelo, @Param("id") Long id, Pageable pageable);
    Page<Equipamento> findByUsuarioId(@Param("id") Long id, Pageable pageable);
    List<Equipamento> getAllByUsuarioId(@Param("id") Long id);
}
