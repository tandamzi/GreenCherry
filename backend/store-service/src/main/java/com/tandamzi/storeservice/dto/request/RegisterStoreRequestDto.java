package com.tandamzi.storeservice.dto.request;

import com.tandamzi.storeservice.domain.Address;
import com.tandamzi.storeservice.domain.CherryBox;
import com.tandamzi.storeservice.domain.Store;
import com.tandamzi.storeservice.domain.Type;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalTime;
import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class RegisterStoreRequestDto {
    private String name;
    private Long memberId;
    private Long typeId;
    private AddressDto address;
    private String phone;
    private LocalTime pickUpStartTime;
    private LocalTime pickUpEndTime;
    private List<MultipartFile> imageFileList;
    private List<Long> allergyIdList;

    public Store toEntity(Type type, CherryBox cherryBox){
        return Store.builder()
                .name(name)
                .memberId(memberId)
                .type(type)
                .address(address.toEntity())
                .phone(phone)
                .pickUpStartTime(pickUpStartTime)
                .pickUpEndTime(pickUpEndTime)
                .open(false)
                .cherryBox(cherryBox)
                .build();
    }

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class AddressDto {
        private String addressName;
        private String detailAddressName;
        private double lat;
        private double lng;

        public Address toEntity(){
            return Address.builder()
                    .addressName(addressName)
                    .detailAddressName(detailAddressName)
                    .lat(lat)
                    .lng(lng)
                    .build();
        }
    }
}
