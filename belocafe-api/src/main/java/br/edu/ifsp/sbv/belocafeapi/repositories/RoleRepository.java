package br.edu.ifsp.sbv.belocafeapi.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import br.edu.ifsp.sbv.belocafeapi.entities.Role;
import br.edu.ifsp.sbv.belocafeapi.entities.ERole;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(ERole name);
}
