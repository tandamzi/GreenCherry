package com.tandamzi.reviewservice.service;

import com.tandamzi.reviewservice.domain.Tag;
import com.tandamzi.reviewservice.dto.TagResponseDto;
import com.tandamzi.reviewservice.repository.TagRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class TagService {

    private final TagRepository tagRepository;

    public List<TagResponseDto> findTags(){
        return tagRepository.findAll().stream()
                .map(TagResponseDto::create)
                .collect(Collectors.toList());
    }
}
