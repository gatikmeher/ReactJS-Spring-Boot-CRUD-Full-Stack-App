package org.project.springboot.service.impl;

import io.micrometer.common.util.StringUtils;
import org.project.springboot.exception.ResourceNotFoundException;
import org.project.springboot.model.Book;
import org.project.springboot.repository.BookRepository;
import org.project.springboot.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookServiceImpl implements BookService {

    @Autowired
    BookRepository bookRepository;


    @Override
    public Page<Book> findAllBook(String title, String date, String genres, Pageable pageable) {
        if(pageable == null) {
            pageable  = PageRequest.of(0, 20);
        }
        if(StringUtils.isEmpty(title) && StringUtils.isEmpty(date) && StringUtils.isEmpty(genres)) {
            return bookRepository.findAll(pageable);
        }
        return bookRepository.findByTitleContainingOrDateContainingOrGenresContaining(title, date, genres, pageable);
    }

    @Override
    public Book saveBook(Book book) {
        return bookRepository.save(book);
    }

    @Override
    public Book updateBook(Long id, Book book) {
        Book findBook = bookRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Book not exist with id :" + id));

        findBook.setTitle(book.getTitle());
        findBook.setAuthor(book.getAuthor());
        findBook.setGenres(book.getGenres());
        findBook.setCharacters(book.getCharacters());
        findBook.setDate(book.getDate());
        findBook.setSynopsis(book.getSynopsis());

        Book updatedBook = bookRepository.save(findBook);
        return updatedBook;
    }

    @Override
    public Book findBookById(Long id) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Book not exist with id :" + id));
        return book;
    }

    @Override
    public void deleteBook(Long id) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Book not exist with id :" + id));
        bookRepository.delete(book);
    }
}


