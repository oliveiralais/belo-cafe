package br.edu.ifsp.sbv.belocafeapi.repositories;

import br.edu.ifsp.sbv.belocafeapi.entities.Insumo;
import br.edu.ifsp.sbv.belocafeapi.entities.TipoInsumo;
import br.edu.ifsp.sbv.belocafeapi.entities.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource( collectionResourceRel = "insumos", path = "insumos" )
public interface InsumoRepository extends JpaRepository<Insumo, Long> {
    Page<Insumo> findById(@Param( "id" ) Long id, Pageable pageable );
    Page<Insumo> findByNomeContainingAndUsuarioId(@Param("nome") String nome, @Param("id") Long id, Pageable pageable);
    Page<Insumo> findByNomeContainingAndTipoInsumoIdAndUsuarioId(@Param("nome") String nome, @Param("insumo") Long insumo,
                                                                 @Param("user") Long user, Pageable pageable);
    Page<Insumo> findByUsuarioId(@Param("id") Long id, Pageable pageable);
    Page<Insumo> findByTipoInsumoIdAndUsuarioId(@Param("insumo") Long insumo,
                                                @Param("user") Long user, Pageable pageable);
}
