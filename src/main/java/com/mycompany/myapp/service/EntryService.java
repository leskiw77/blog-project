package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.Entry;
import com.mycompany.myapp.domain.Tag;
import com.mycompany.myapp.domain.User;
import com.mycompany.myapp.repository.EntryRepository;
import com.mycompany.myapp.repository.UserRepository;
import com.mycompany.myapp.service.dto.EntryRequestDTO;
import com.mycompany.myapp.service.dto.EntryResponseDTO;
import com.mycompany.myapp.service.dto.EntryResponseListDTO;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
@Transactional
public class EntryService {

    private final UserRepository userRepository;
    private final EntryRepository entryRepository;
    private final TagsService tagsService;

    public EntryService(UserRepository userRepository, EntryRepository entryRepository, TagsService tagsService) {
        this.userRepository = userRepository;
        this.entryRepository = entryRepository;
        this.tagsService = tagsService;
    }

    public boolean createNewEntry(EntryRequestDTO entryRequestDTO){
        User user = getUserById(entryRequestDTO.getCreatorId());

        if(titleAlreadyIdBlog(entryRequestDTO.getTitle())){
            return false;
        }

        Set<Tag> tags = tagsService.getSetOfTags(entryRequestDTO.getTags());

        Entry entry = new Entry(entryRequestDTO.getTitle(), LocalDateTime.now(), tags, user, entryRequestDTO.getText());

        entryRepository.save(entry);
        return true;
    }

    private boolean titleAlreadyIdBlog(String title) {
        return entryRepository.findByTitle(title).isPresent();
    }

    private User getUserById(long id) {
        return userRepository.findById(id)
            .orElseThrow(() -> new IllegalStateException("No user with id " + id));
    }

    public EntryResponseListDTO getAll(Optional<String> tag){
        Stream<Entry> entries = entryRepository.findAll().stream();

        if(tag.isPresent()){
            System.out.printf("is present");
            entries = entries.filter(e -> e.getTags().contains(new Tag(tag.get())));
        }

        List<EntryResponseDTO> entriesDtoList = entries
            .map(e -> new EntryResponseDTO(e.getId(), e.getTitle(), e.getCreationDateTime(),
                 e.getCreator().getLogin(), e.getText()))
            .collect(Collectors.toList());

        return new EntryResponseListDTO(entriesDtoList);
    }


}
