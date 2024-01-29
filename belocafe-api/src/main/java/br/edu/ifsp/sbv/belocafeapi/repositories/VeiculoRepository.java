package br.edu.ifsp.sbv.belocafeapi.repositories;

import br.edu.ifsp.sbv.belocafeapi.entities.Veiculo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource( collectionResourceRel = "veiculos", path = "veiculos" )
public interface VeiculoRepository extends JpaRepository<Veiculo, Long> {
    Page<Veiculo> findById(@Param("id") Long id, Pageable pageable);
    Page<Veiculo> findByNomeContainingAndUsuarioId(@Param("nome") String nome, @Param("id") Long id, Pageable pageable);
    Page<Veiculo> findByIdentificacaoContainingAndUsuarioId(@Param("identificacao") String identificacao, @Param("id") Long id, Pageable pageable);
    Page<Veiculo> findByFabricanteContainingAndUsuarioId(@Param("fabricante") String fabricante, @Param("id") Long id, Pageable pageable);
    Page<Veiculo> findByModeloContainingAndUsuarioId(@Param("modelo") String modelo, @Param("id") Long id, Pageable pageable);
    Page<Veiculo> findByUsuarioId(@Param("id") Long id, Pageable pageable);
    List<Veiculo> getAllByUsuarioId(@Param("id") Long id);
}
