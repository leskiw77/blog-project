package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Entry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EntryRepository extends JpaRepository<Entry, Long> {
    Optional<Entry> findByTitle(String title);
}
