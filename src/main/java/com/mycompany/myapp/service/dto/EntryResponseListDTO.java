package com.mycompany.myapp.service.dto;

import java.util.List;

public class EntryResponseListDTO {
    List<EntryResponseDTO> entriesList;

    public EntryResponseListDTO() {
    }

    public EntryResponseListDTO(List<EntryResponseDTO> entriesList) {
        this.entriesList = entriesList;
    }

    public List<EntryResponseDTO> getEntriesList() {
        return entriesList;
    }

    public void setEntriesList(List<EntryResponseDTO> entriesList) {
        this.entriesList = entriesList;
    }
}
