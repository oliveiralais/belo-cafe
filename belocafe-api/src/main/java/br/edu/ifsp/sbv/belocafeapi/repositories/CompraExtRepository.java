package br.edu.ifsp.sbv.belocafeapi.repositories;

import br.edu.ifsp.sbv.belocafeapi.entities.CompraExt;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import br.edu.ifsp.sbv.belocafeapi.entities.User;


@RepositoryRestResource(collectionResourceRel = "comprasExt", path = "comprasExt")
public interface CompraExtRepository extends JpaRepository<CompraExt, Long> {

    Page<CompraExt> findById(@Param("id") Long id, Pageable pageable);
    Page<CompraExt> findByTituloContainingAndUsuarioId(@Param("titulo") String titulo, @Param("id") Long id, Pageable pageable);
    Page<CompraExt> findByDescricaoContainingAndUsuarioId(@Param("titulo") String descricao, @Param("id") Long id, Pageable pageable);
    Page<CompraExt> findByDataContainingAndUsuarioId(@Param("data") String data, @Param("id") Long id, Pageable pageable);
    Page<CompraExt> findByUsuarioId(@Param("user") Long user, Pageable pageable);

}
