package com.tandamzi.storeservice.dto.response;

import com.tandamzi.storeservice.domain.Allergy;
import lombok.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class AllergyResponseDto {
    private Long id;
    private String name;

    public static AllergyResponseDto create(Allergy allergy) {
        return AllergyResponseDto.builder()
                .id(allergy.getId())
                .name(allergy.getName())
                .build();
    }
}
