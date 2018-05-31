package com.mycompany.myapp.service;

import java.util.List;

public class SearchRequestDTO {

    private String author;

    private List<String> tags;

    public SearchRequestDTO() {
    }

    public SearchRequestDTO(String author, List<String> tags) {
        this.author = author;
        this.tags = tags;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public List<String> getTags() {
        return tags;
    }

    public void setTags(List<String> tags) {
        this.tags = tags;
    }
}
