package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.Entry;
import com.mycompany.myapp.domain.Tag;
import com.mycompany.myapp.domain.User;
import com.mycompany.myapp.repository.EntryRepository;
import com.mycompany.myapp.repository.UserRepository;
import com.mycompany.myapp.security.AuthoritiesConstants;
import com.mycompany.myapp.security.SecurityUtils;
import com.mycompany.myapp.service.dto.EntryRequestDTO;
import com.mycompany.myapp.service.dto.EntryResponseDTO;
import com.mycompany.myapp.service.dto.EntryResponseListDTO;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Collections;
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
        Optional<User> user = SecurityUtils.getCurrentUserLogin()
            .flatMap(userRepository::findOneByLogin);

        if(titleAlreadyIdBlog(entryRequestDTO.getTitle()) || !user.isPresent()){
            return false;
        }

        Set<Tag> tags = tagsService.getSetOfTags(entryRequestDTO.getTags());

        Entry entry = new Entry(entryRequestDTO.getTitle(), LocalDateTime.now(), tags, user.get(), entryRequestDTO.getText());

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

    public EntryResponseListDTO getAll(){
        Stream<Entry> entries = entryRepository.findAll().stream();

        List<EntryResponseDTO> entriesDtoList = entries
            .map(e -> new EntryResponseDTO(e.getId(), e.getTitle(), e.getCreationDateTime(),
                 e.getCreator().getLogin(), e.getText()))
            .collect(Collectors.toList());

        return new EntryResponseListDTO(entriesDtoList);
    }


    public EntryResponseListDTO getAllSearched(SearchRequestDTO searchRequestDTO) {
        Stream<Entry> entries = getEntryStream(searchRequestDTO);

        if(searchRequestDTO.getTags() != null && !searchRequestDTO.getTags().isEmpty()){
            System.out.println("Search by tags");
            entries = entries
                .filter( entry -> anyTagInList(searchRequestDTO.getTags(),
                    entry.getTags().stream()
                        .map(Tag::getName)
                        .collect(Collectors.toList())));
        }

        List<EntryResponseDTO> entriesDtoList = entries
            .map(e -> new EntryResponseDTO(e.getId(), e.getTitle(), e.getCreationDateTime(),
                e.getCreator().getLogin(), e.getText()))
            .collect(Collectors.toList());

        return new EntryResponseListDTO(entriesDtoList);
    }

    private boolean anyTagInList(List<String> searchedTags, List<String> entryTags){
        for (String s: searchedTags){
            if(entryTags.contains(s)){
                return true;
            }
        }
        return false;
    }

    private Stream<Entry> getEntryStream(SearchRequestDTO searchRequestDTO) {
        Stream<Entry> entries;
        if(searchRequestDTO.getAuthor() != null && !searchRequestDTO.getAuthor().isEmpty()){
            System.out.println("search by user");
            entries = entryRepository.findAll().stream().filter(e -> e.getCreator().getLogin().equals(searchRequestDTO.getAuthor()));
        }else {
            entries = entryRepository.findAll().stream();
        }
        return entries;
    }

    public boolean deleteEntry(long entryId) {
        Optional<String> user = SecurityUtils.getCurrentUserLogin();
        if(!user.isPresent()){
            return false;
        }

        Optional<Entry> entry = entryRepository.findById(entryId);
        if(!entry.isPresent()){
            return false;
        }

        if(SecurityUtils.isCurrentUserInRole(AuthoritiesConstants.ADMIN)){
            entryRepository.deleteById(entryId);
            return true;
        }

        if (!entry.get().getCreator().getLogin().equals(user.get())){
            return false;
        }

        entryRepository.deleteById(entryId);
        return true;
    }
}
