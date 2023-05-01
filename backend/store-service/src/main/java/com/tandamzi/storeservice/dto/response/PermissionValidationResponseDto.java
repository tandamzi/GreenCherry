package com.tandamzi.storeservice.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyDescription;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@ToString
public class PermissionValidationResponseDto {
    @JsonProperty("total_count")
    private String totalCount;
    @JsonProperty("row")
    private List<Row> row;
    @JsonProperty("RESULT")
    private PermissionResult permissionResult;

}

class PermissionResult{
    @JsonProperty("MSG")
    private String MSG;
    @JsonProperty("CODE")
    private String CODE;
}

class Row{
    @JsonProperty("PRSDNT_NM")
    private String name; //대표자이름
    @JsonProperty("INDUTY_CD_NM")
    private String type; //업종
    @JsonProperty("PRMS_DT")
    @JsonPropertyDescription("허가일자")
    private String permissionDate; //허가일자
    @JsonProperty("LCNS_NO")
    private String permissionNumber; //사업자번호
    @JsonProperty("BSSH_NM")
    private String storeName; //업소명
    @JsonProperty("TELNO")
    private String tel;
    @JsonProperty("ADDR")
    private String address;
}
