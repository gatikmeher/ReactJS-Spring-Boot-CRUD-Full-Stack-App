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
    public List<Book> findAllBook(Pageable pageable) {
        if(pageable == null) {
            pageable  = PageRequest.of(0, 20);
        }
        return bookRepository.findAll(pageable).stream().toList();
    }
}


