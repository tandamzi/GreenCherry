package com.tandamzi.storeservice.repository;

import com.tandamzi.storeservice.domain.Store;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StoreRepository extends JpaRepository<Store, Long> {
    @Query("SELECT s FROM Store s JOIN FETCH s.type JOIN FETCH s.cherryBox WHERE s.id = :id")
    Optional<Store> findByIdWithEagerTypeAndBox(Long id);

    @Query("SELECT s FROM Store s JOIN FETCH s.cherryBox WHERE s.id = :id")
    Optional<Store> findByIdWithCherryBox(Long id);

}
