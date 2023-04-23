package com.tandamzi.storeservice.repository;

import com.tandamzi.storeservice.domain.StoreAllergy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StoreAllergyRepository extends JpaRepository<StoreAllergy, Long>{

}
