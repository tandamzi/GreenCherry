package com.tandamzi.storeservice.repository;

import com.tandamzi.storeservice.domain.Store;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.persistence.LockModeType;
import java.util.Optional;

@Repository
public interface StoreRepository extends JpaRepository<Store, Long>, StoreRepositoryCustom {
    @Query("SELECT s FROM Store s JOIN FETCH s.type JOIN FETCH s.cherryBox WHERE s.id = :id")
    Optional<Store> findByIdWithEagerTypeAndBox(Long id);

    @Query("SELECT s FROM Store s JOIN FETCH s.cherryBox WHERE s.id = :id")
    Optional<Store> findByIdWithCherryBox(Long id);

    /**[주문하기용] 가게 상세 조회 */
    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT s FROM Store s JOIN FETCH s.cherryBox WHERE s.id = :id")
    Optional<Store> findByIdLockWithCherryBox(Long id);


}
