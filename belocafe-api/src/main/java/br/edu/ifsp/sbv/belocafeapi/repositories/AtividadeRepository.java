package br.edu.ifsp.sbv.belocafeapi.repositories;

import br.edu.ifsp.sbv.belocafeapi.entities.Atividade;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface AtividadeRepository extends JpaRepository<Atividade, Long> {
    Page<Atividade> findById(@Param( "id" ) Long id, Pageable pageable );
    Page<Atividade> findByUsuarioIdAndDataInicioBetweenOrderByDataInicioDesc(@Param( "user" ) Long user,
                                                                             @Param("inicio") LocalDate inicio,
                                                                             @Param("fim") LocalDate fim,
                                                                             Pageable pageable );
    Page<Atividade> findByTipoAtividadeIdAndUsuarioId(@Param( "atividade" ) Long atividade,
                                                      @Param( "user" ) Long user, Pageable pageable );
    Page<Atividade> findByLocalIdAndDataInicioBetweenOrderByDataInicioDesc(@Param( "gleba" ) Long gleba,
                                                                           @Param("inicio") LocalDate inicio,
                                                                           @Param("fim") LocalDate fim,
                                                                           Pageable pageable);

    Page<Atividade> findByStatusAtividadeIdAndUsuarioId(@Param( "status" ) Long status,
                                                        @Param( "user" ) Long user, Pageable pageable);

    Page<Atividade> findByMaquinasIdAndDataInicioBetweenOrderByDataInicioDesc(@Param("maquina") Long maquina,
                                                                              @Param("inicio") LocalDate inicio,
                                                                              @Param("fim") LocalDate fim,
                                                                              Pageable pageable);

    Page<Atividade> findByEquipamentosIdAndDataInicioBetweenOrderByDataInicioDesc(@Param("equipamento") Long equipamento,
                                                                                  @Param("inicio") LocalDate inicio,
                                                                                  @Param("fim") LocalDate fim,
                                                                                  Pageable pageable);

    Page<Atividade> findByVeiculosIdAndDataInicioBetweenOrderByDataInicioDesc(@Param("veiculo") Long veiculo,
                                                                                  @Param("inicio") LocalDate inicio,
                                                                                  @Param("fim") LocalDate fim,
                                                                                  Pageable pageable);

    @Query("SELECT MONTH(a.dataInicio) as month, SUM(a.custoPrevisto) as totalCustoPrevisto " +
            "FROM Atividade a " +
            "WHERE YEAR(a.dataInicio) = :year AND a.usuario.id = :userId " +
            "GROUP BY MONTH(a.dataInicio) " +
            "ORDER BY MONTH(a.dataInicio)")
    List<Object[]> findCustoPrevistoByMonthAndUserId(@Param("year") int year, @Param("userId") Long userId);

    @Query("SELECT MONTH(a.dataInicio) as month, COUNT(a.id) as totalAtividades " +
            "FROM Atividade a " +
            "WHERE YEAR(a.dataInicio) = :year AND a.usuario.id = :userId " +
            "GROUP BY MONTH(a.dataInicio) " +
            "ORDER BY MONTH(a.dataInicio)")
    List<Object[]> findNumeroAtividadesByMonthAndUserId(@Param("year") int year, @Param("userId") Long userId);

    @Query("SELECT g.name as gleba, SUM(a.custoPrevisto) as totalCustoPrevisto " +
            "FROM Atividade a " +
            "JOIN a.local g " +
            "WHERE YEAR(a.dataInicio) = :year AND a.usuario.id = :userId " +
            "GROUP BY g.name " +
            "ORDER BY g.name")
    List<Object[]> findCustoPrevistoPorGlebaEUsuario(@Param("year") int year, @Param("userId") Long userId);
}
