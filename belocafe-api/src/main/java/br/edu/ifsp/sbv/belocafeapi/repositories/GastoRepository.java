package br.edu.ifsp.sbv.belocafeapi.repositories;

import br.edu.ifsp.sbv.belocafeapi.entities.Gasto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource( collectionResourceRel = "gastos", path = "gastos" )
public interface GastoRepository extends JpaRepository<Gasto, Long> {
    Page<Gasto> findById(@Param("id") Long id, Pageable pageable);
    Page<Gasto> findByCodeContainingAndUsuarioId(@Param("code") Long code, @Param("id") Long id, Pageable pageable);
    Page<Gasto> findByNameContainingAndUsuarioId(@Param("name") String name, @Param("id") Long id, Pageable pageable);
    Page<Gasto> findByUsuarioId(@Param("id") Long id, Pageable pageable);
}
