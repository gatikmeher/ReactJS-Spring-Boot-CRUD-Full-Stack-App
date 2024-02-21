package org.project.springboot.service;

import org.project.springboot.model.Book;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface BookService {

    List<Book> findAllBook(String title, String date, String genres, Pageable pageable);
}
