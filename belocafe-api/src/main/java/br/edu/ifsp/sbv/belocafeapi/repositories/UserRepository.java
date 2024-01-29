package br.edu.ifsp.sbv.belocafeapi.repositories;

import br.edu.ifsp.sbv.belocafeapi.entities.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Page<User> findById(@Param("id") Long id, Pageable pageable);
    Optional<User> findByEmail(String email);
    Boolean existsByCpfCnpj(String cpfCnpj);
    Boolean existsByEmail(String email);
}
