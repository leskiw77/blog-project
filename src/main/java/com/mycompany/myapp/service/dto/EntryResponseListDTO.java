package com.mycompany.myapp.service.dto;

import java.util.LinkedList;
import java.util.List;

public class EntryResponseListDTO {
    private List<EntryResponseDTO> entriesList;
    private List<EntryResponseDTO> entriesListForTweeter;

    public EntryResponseListDTO() {
        new EntryResponseListDTO(null, null);
    }

    public EntryResponseListDTO(List<EntryResponseDTO> entriesList) {
        this.entriesList = entriesList;
        this.entriesListForTweeter = null;
    }

    public EntryResponseListDTO(List<EntryResponseDTO> entriesList, List<EntryResponseDTO> entriesListForTweeter) {
        this.entriesList = entriesList;
        this.entriesListForTweeter = entriesListForTweeter;
    }

    public List<EntryResponseDTO> getEntriesList() {
        return entriesList;
    }

    public void setEntriesList(List<EntryResponseDTO> entriesList) {
        this.entriesList = entriesList;
    }

    public List<EntryResponseDTO> getEntriesListForTweeter() {
        return entriesListForTweeter;
    }

    public void setEntriesListForTweeter(List<EntryResponseDTO> entriesListForTweeter) {
        this.entriesListForTweeter = entriesListForTweeter;
    }
}
