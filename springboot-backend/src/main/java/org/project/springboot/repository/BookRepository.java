package org.project.springboot.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import org.project.springboot.model.Book;

import java.util.List;


public interface BookRepository extends JpaRepository<Book, Long> {

    // find book containgin title, genres and Date
    Page<Book> findByTitleContainingOrDateContainingOrGenresContaining(String title, String date, String genres, Pageable pageable);

}
