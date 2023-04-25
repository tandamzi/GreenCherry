package com.tandamzi.storeservice.dto.response;

import com.tandamzi.storeservice.domain.Type;
import lombok.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class TypeResponseDto {
    private Long id;
    private String name;

    public static TypeResponseDto create(Type type){
        return TypeResponseDto.builder()
                .id(type.getId())
                .name(type.getName())
                .build();
    }
}
