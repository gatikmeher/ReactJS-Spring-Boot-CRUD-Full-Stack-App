package org.project.springboot.service.impl;

import org.project.springboot.model.Book;
import org.project.springboot.repository.BookRepository;
import org.project.springboot.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookServiceImpl implements BookService {

    @Autowired
    BookRepository bookRepository;


    @Override
    public List<Book> findAllBook(String title, String date, String genres, Pageable pageable) {
        if(pageable == null) {
            pageable  = PageRequest.of(0, 20);
        }
        return bookRepository.findByTitleIgnoreCaseContainingOrDateIgnoreCaseContainingOrGenresIgnoreCaseContaining(title, date, genres, pageable).stream().toList();
    }
}


