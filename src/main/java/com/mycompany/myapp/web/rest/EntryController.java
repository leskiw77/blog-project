package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.service.EntryService;
import com.mycompany.myapp.service.TagsService;
import com.mycompany.myapp.service.dto.EntryRequestDTO;
import com.mycompany.myapp.service.dto.EntryResponseListDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;


@RestController
@RequestMapping("/entry")
public class EntryController {

    @Autowired
    private EntryService entryService;

    @Autowired
    private TagsService tagsService;

    @PostMapping("/new")
    public ResponseEntity createNewEntry(@RequestBody EntryRequestDTO entryRequestDTO) {
        return entryService.createNewEntry(entryRequestDTO) ?
            ResponseEntity.ok(HttpStatus.CREATED) : ResponseEntity.ok(HttpStatus.CONFLICT);
    }

    @GetMapping("/all")
    @ResponseBody
    public EntryResponseListDTO postResponseController(@RequestParam("tag") Optional<String> tag) {
        System.out.println(tag.isPresent());
        return entryService.getAll(tag);
    }
}