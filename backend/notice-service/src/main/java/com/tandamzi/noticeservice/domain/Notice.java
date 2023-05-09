package com.tandamzi.noticeservice.domain;

import com.tandamzi.noticeservice.dto.response.NoticeListResponseDto;
import com.tandamzi.noticeservice.dto.response.OrderMobileListResponseDto;
import lombok.*;

import javax.persistence.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Builder
@ToString
@Table(name = "notice")
public class Notice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "notice_id")
    private Long id;

    private Long storeId;
    private Long memberId;
    private Long orderId;

    private boolean isRead;

    public static Notice create(NoticeListResponseDto dto){
        return Notice.builder()
                .storeId(dto.getStoreId())
                .memberId(dto.getMemberId())
                .orderId(dto.getOrderId())
//                읽음 표시 메소드 호출해서 확인하기
                .isRead(false)
                .build();
    }



}
