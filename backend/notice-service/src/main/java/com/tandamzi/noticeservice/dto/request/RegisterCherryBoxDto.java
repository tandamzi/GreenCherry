package com.tandamzi.noticeservice.dto.request;


import lombok.*;

import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class RegisterCherryBoxDto {
    private int noticeType;
    private Long storeId;
    private String storeName;
    private List<String> tokens;
}
