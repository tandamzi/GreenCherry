package com.tandamzi.storeservice.repository;

import com.tandamzi.storeservice.domain.Store;
import com.tandamzi.storeservice.domain.StoreImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StoreImageRepository extends JpaRepository<StoreImage, Long> {
    List<StoreImage> findStoreImagesByStore(Store store);

    void deleteStoreImagesByStore(Store store);

}
