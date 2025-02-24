package com.nextlift.SsoService.repository;

import com.nextlift.SsoService.model.GymUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GymUserRepository extends JpaRepository<GymUser,Long> {

    GymUser findByUsername(String username);
    boolean existsByUsername(String username);
}
