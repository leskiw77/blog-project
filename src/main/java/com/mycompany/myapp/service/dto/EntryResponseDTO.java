package com.mycompany.myapp.service.dto;

import java.time.LocalDateTime;

public class EntryResponseDTO {

    private Long id;

    private String title;

    private LocalDateTime creationDateTime;

    private String creatorLogin;

    private String text;

    public EntryResponseDTO() {
    }

    public EntryResponseDTO(Long id, String title, LocalDateTime creationDateTime, String creatorLogin, String text) {
        this.id = id;
        this.title = title;
        this.creationDateTime = creationDateTime;
        this.creatorLogin = creatorLogin;
        this.text = text;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public LocalDateTime getCreationDateTime() {
        return creationDateTime;
    }

    public void setCreationDateTime(LocalDateTime creationDateTime) {
        this.creationDateTime = creationDateTime;
    }

    public String getCreatorLogin() {
        return creatorLogin;
    }

    public void setCreatorLogin(String creatorLogin) {
        this.creatorLogin = creatorLogin;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }
}
