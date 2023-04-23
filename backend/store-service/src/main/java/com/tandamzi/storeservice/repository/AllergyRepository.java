package com.tandamzi.storeservice.repository;

import com.tandamzi.storeservice.domain.Allergy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AllergyRepository extends JpaRepository<Allergy, Long> {

}
