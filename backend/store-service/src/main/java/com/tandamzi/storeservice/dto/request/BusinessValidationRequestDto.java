package com.tandamzi.storeservice.dto.request;

import lombok.*;

import java.io.Serializable;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@ToString
public class BusinessValidationRequestDto implements Serializable{
    private String b_no;
    private String start_dt;
    private String p_nm;
    private String p_nm2;
    private String b_nm;
    private String corp_no;
    private String b_sector;
    private String b_type;
}


