package com.mycompany.myapp.service.dto;

import java.util.List;

public class EntryRequestDTO {

//    todo: consider change to name
    private int creatorId;

    private String title;

    private String text;

    private List<String> tags;

    public EntryRequestDTO(int creatorId, String title, String text, List<String> tags) {
        this.creatorId = creatorId;
        this.title = title;
        this.text = text;
        this.tags = tags;
    }

    public EntryRequestDTO() {
    }

    public int getCreatorId() {
        return creatorId;
    }

    public void setCreatorId(int creatorId) {
        this.creatorId = creatorId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public List<String> getTags() {
        return tags;
    }

    public void setTags(List<String> tags) {
        this.tags = tags;
    }
}
