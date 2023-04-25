package com.tandamzi.storeservice.repository;

import com.tandamzi.storeservice.domain.Cherrybox;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CherryBoxRepository extends JpaRepository<Cherrybox, Long> {
}
