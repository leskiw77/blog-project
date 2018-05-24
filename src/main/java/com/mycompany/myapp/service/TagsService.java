package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.Tag;
import com.mycompany.myapp.repository.TagRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@Transactional
public class TagsService {

    private final Logger log = LoggerFactory.getLogger(TagsService.class);

    private final TagRepository tagRepository;

    public TagsService(TagRepository tagRepository) {
        this.tagRepository = tagRepository;
    }

    public Set<Tag> getSetOfTags(List<String> tagNames){

        Set<Tag> tagSet = new HashSet<>();

        for (String tagName : tagNames){
            tagSet.add(getTagByName(tagName));
        }
        return tagSet;
    }

    public Tag getTagByName(String tagName) {
        Optional<Tag> tagElement = tagRepository.findByName(tagName);

        return tagElement.orElseGet(() -> createNewTag(tagName));
    }

    private Tag createNewTag(String tagName) {
        return tagRepository.save(new Tag(tagName));
    }

}
