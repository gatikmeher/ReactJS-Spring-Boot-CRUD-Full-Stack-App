package org.project.springboot.service;

import org.project.springboot.model.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface BookService {

    Page<Book> findAllBook(String title, String date, String genres, Pageable pageable);

    Book saveBook(Book book);

    Book updateBook(Long id, Book book);

    Book findBookById(Long id);

    void deleteBook(Long id);
}
