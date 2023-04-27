package com.tandamzi.storeservice.repository;

import com.tandamzi.storeservice.domain.Allergy;
import com.tandamzi.storeservice.domain.Store;
import com.tandamzi.storeservice.domain.StoreAllergy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StoreAllergyRepository extends JpaRepository<StoreAllergy, Long>{
    @Query("select sa from StoreAllergy sa join fetch sa.allergy where sa.store = :store")
    List<StoreAllergy> findAllByStore(Store store);

}
