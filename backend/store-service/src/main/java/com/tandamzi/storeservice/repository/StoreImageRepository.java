package com.tandamzi.storeservice.repository;

import com.tandamzi.storeservice.domain.Store;
import com.tandamzi.storeservice.domain.StoreImage;
import com.tandamzi.storeservice.dto.feign.StoreImageQueryDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StoreImageRepository extends JpaRepository<StoreImage, Long> {
    List<StoreImage> findStoreImagesByStore(Store store);

    Optional<StoreImage> findTopByStore(Store store);

    void deleteStoreImagesByStore(Store store);

    @Query("select new com.tandamzi.storeservice.dto.feign.StoreImageQueryDto(s.id, si.id, s.name, s.open, si.url) " +
            "from StoreImage si join Store s on si.store = s " +
            "where s.id in :storeIds " +
            "group by s.id, si.id, s.name, s.open, si.url")
    List<StoreImageQueryDto> findByStoreIds(@Param("storeIds")List<Long> storeIds);

}
