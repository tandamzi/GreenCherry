package com.tandamzi.storeservice.service;

import com.tandamzi.storeservice.domain.CherryBox;
import com.tandamzi.storeservice.domain.Store;
import com.tandamzi.storeservice.exception.CherryBoxQuantityInsufficientException;
import com.tandamzi.storeservice.exception.StoreNotFoundException;
import com.tandamzi.storeservice.repository.StoreRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class CherryBoxService {

    private final StoreRepository storeRepository;

    @Transactional
    public void decreaseCherryBox(Long storeId , int orderQuantity){
        log.info("[CherryBoxService] decreaseCherrybox => storeId :{} , orderQuantity : {}",storeId,orderQuantity);
        Store store = storeRepository.findById(storeId).orElseThrow(StoreNotFoundException::new);
        CherryBox cherryBox = store.getCherryBox();

        if(cherryBox.getQuantity() < orderQuantity){
            throw new CherryBoxQuantityInsufficientException();
        }

        cherryBox.decreaseCherryBox(orderQuantity);
    }
}
