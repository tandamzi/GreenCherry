package com.tandamzi.reviewservice.dto;

import com.tandamzi.reviewservice.domain.Tag;
import lombok.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class TagResponseDto {
    private Long id;
    private String name;

    public static TagResponseDto create(Tag tag){
        return TagResponseDto.builder()
                .id(tag.getId())
                .name(tag.getName())
                .build();
    }
}
