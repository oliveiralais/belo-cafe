package br.edu.ifsp.sbv.belocafeapi.repositories;

import br.edu.ifsp.sbv.belocafeapi.entities.Venda;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

public interface VendaRepository extends JpaRepository<Venda, Long> {
    Page<Venda> findById(@Param("id") Long id, Pageable pageable);

    Page<Venda> findByDataContainingAndUsuarioId(@Param("data") String data, @Param("id") Long id, Pageable pageable);

    Page<Venda> findByValorContainingAndUsuarioId(@Param("valor") Double valor, @Param("id") Long id, Pageable pageable);

    Page<Venda> findByQtdCafeContainingAndUsuarioId(@Param("qtdCafe") Double qtdCafe, @Param("id") Long id, Pageable pageable);

    Page<Venda> findByUsuarioId(@Param("id") Long id, Pageable pageable);

}
