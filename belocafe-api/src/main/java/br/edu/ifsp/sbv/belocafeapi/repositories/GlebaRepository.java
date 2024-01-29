package br.edu.ifsp.sbv.belocafeapi.repositories;

import br.edu.ifsp.sbv.belocafeapi.entities.Gleba;
import br.edu.ifsp.sbv.belocafeapi.entities.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

public interface GlebaRepository extends JpaRepository<Gleba, Long> {

     Page<Gleba> findById( @Param( "id" ) Long id, Pageable pageable );
     Page<Gleba> findByNameContainingAndProprietaryId(@Param("name") String name, @Param("id") Long id, Pageable pageable);
     Page<Gleba> findByProprietary(@Param("proprietary") User proprietary, Pageable pageable);
     Page<Gleba> findByProprietaryId(@Param("id") Long id, Pageable pageable);

}
