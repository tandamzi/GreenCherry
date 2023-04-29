package com.tandamzi.storeservice.dto.response;

import lombok.*;

import java.util.List;

@Getter @Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@ToString
public class BusinessValidationResponseDto {
    private String status_code;
    private int request_cnt;
    private int valid_cnt;
    private List<DataItem> data;



    @Getter @Setter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    @AllArgsConstructor
    @Builder
    @ToString
    public static class RequestParam {
        // 필드 및 getters and setters 추가'
        private String b_no;
        private String start_dt;
        private String p_nm;
        private String p_nm2;
        private String b_nm;
        private String corp_no;
        private String b_sector;
        private String b_type;
    }
    @Getter @Setter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    @AllArgsConstructor
    @Builder
    @ToString
    public static class Status {
        private String b_no;
        private String b_stt;
        private String b_stt_cd;
        private String tax_type;
        private String tax_type_cd;
        private String end_dt;
        private String utcc_yn;
        private String tax_type_change_dt;
        private String invoice_apply_dt;

    }
    @Getter
    @Setter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    @AllArgsConstructor
    @Builder
    @ToString
    public static class DataItem{
        private String b_no;
        private String valid;
        private String valid_msg;
        private BusinessValidationResponseDto.RequestParam request_param;
        private BusinessValidationResponseDto.Status status;
    }


}


