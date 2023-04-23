package com.tandamzi.storeservice.dto.request;

import com.tandamzi.storeservice.domain.Store;
import com.tandamzi.storeservice.domain.Type;
import lombok.*;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class RegisterStoreRequestDto {
    private String name;
    private Long ownerId;
    private Long typeId;
    private AddressRequestDto address = new AddressRequestDto();
    private String phone;
    private LocalTime pickUpStartTime;
    private LocalTime pickUpEndTime;


    private List<Long> allergyIdList = new ArrayList<>();
    private List<String> imageUrlList = new ArrayList<>();

    public Store toEntity(Type type){
        return Store.builder()
                .name(name)
                .ownerId(ownerId)
                .type(type)
                .address(address.toEntity())
                .phone(phone)
                .pickUpStartTime(pickUpStartTime)
                .pickUpEndTime(pickUpEndTime)
                .closed(false)
                .build();
    }



}
