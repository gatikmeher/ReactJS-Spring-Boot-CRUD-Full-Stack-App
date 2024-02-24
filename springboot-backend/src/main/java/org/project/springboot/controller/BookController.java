package org.project.springboot.controller;

import java.io.IOException;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.io.Writer;
import java.nio.charset.StandardCharsets;
import java.util.*;
import java.util.stream.Collectors;

import com.opencsv.CSVWriter;
import com.opencsv.bean.ColumnPositionMappingStrategy;
import com.opencsv.bean.StatefulBeanToCsv;
import com.opencsv.bean.StatefulBeanToCsvBuilder;
import com.opencsv.exceptions.CsvDataTypeMismatchException;
import com.opencsv.exceptions.CsvRequiredFieldEmptyException;
import io.micrometer.common.util.StringUtils;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.project.springboot.exception.ResourceNotFoundException;
import org.project.springboot.repository.BookRepository;
import org.project.springboot.service.BookService;
import org.project.springboot.validator.BookValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.data.web.SpringDataWebProperties;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import org.project.springboot.model.Book;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.mvc.method.annotation.StreamingResponseBody;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/book-project/bookapi")
public class BookController {

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private BookService bookService;

    @Autowired
    private BookValidator bookValidator;

    // get all books
    @GetMapping(value = "/books", produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE, MediaType.TEXT_PLAIN_VALUE})
    public ResponseEntity<Object> getAllBooks(@RequestHeader(value = "Output-Format", required = false) String acceptType,
                                              @RequestParam(required = false, name = "page") Integer page,
                                              @RequestParam(required = false, name = "size") Integer size,
                                              @RequestParam(required = false, name = "title") String title,
                                              @RequestParam(required = false, name = "date") String date,
                                              @RequestParam(required = false, name = "genres") String genres,
                                              HttpServletResponse response) throws CsvRequiredFieldEmptyException, CsvDataTypeMismatchException, IOException {
        HttpHeaders header = new HttpHeaders();
        response.reset();
        System.out.println("Output-Format: " + acceptType);
        System.out.println("Page: " + page);
        if (acceptType != null) {
            switch (acceptType) {
                case MediaType.APPLICATION_JSON_VALUE:
                    header.setContentType(MediaType.APPLICATION_JSON);
                    break;
                case MediaType.APPLICATION_XML_VALUE:
                    header.setContentType(MediaType.APPLICATION_XML);
                    break;
                case "text/csv":
                    header.setContentType(MediaType.TEXT_PLAIN);
                    break;
                default:
                    header.setContentType(MediaType.APPLICATION_JSON);
                    break;
            }
        }
        header.setAccessControlAllowOrigin("*");
        page = (null == page || page < 0) ? 0 : page;
        size = (null == size || size < 25) ? 25 : size;
        Pageable pageable = PageRequest.of(page.intValue(), size.intValue());
        if (StringUtils.isNotEmpty(acceptType) && acceptType.equals(MediaType.TEXT_PLAIN_VALUE)) {
            StringBuilder csvContent = new StringBuilder();

            List<Book> dataList = bookService.findAllBook(title, date, genres, pageable).stream().toList();

            // Append CSV headers
            csvContent.append("id,title,author,date,genres,characters,synopsis").append(System.lineSeparator()); // Replace with your actual column names

            // Append data to CSV
            csvContent.append(
                    dataList.stream()
                            .map(data -> data.getId() + ",\"" + data.getTitle().replace("\"", "") + "\",\"" + data.getAuthor().replace("\"", "")
                                    + "\"," + data.getDate().replace("\"", "") + ",\"" + data.getGenres().replace("\"", "")
                                    + "\",\"" + data.getCharacters().replace("\"", "") + "\",\"" + data.getSynopsis().replace("\"", "") + "\"") // Adjust based on your data model
                            .collect(Collectors.joining(System.lineSeparator())));
            return ResponseEntity.ok().headers(header).body(csvContent.toString());
        }
        return ResponseEntity.ok().headers(header).body(bookService.findAllBook(title, date, genres, pageable));
    }

    // create book rest api
    @PostMapping("/books")
    public ResponseEntity<Object> insertBook(@Valid @RequestBody Book book) {
        bookValidator.checkInputValue(book.getTitle(), book.getAuthor(), book.getDate(), book.getGenres(), book.getCharacters(), book.getSynopsis());
        return ResponseEntity.ok().body(bookService.saveBook(book));
    }

    // get book by id rest api
    @GetMapping("/books/{id}")
    public ResponseEntity<Book> getBookById(@PathVariable Long id) {
        Book book = bookService.findBookById(id);
        return ResponseEntity.ok(book);
    }

    // update book rest api

    @PutMapping("/books/{id}")
    public ResponseEntity<Book> updateBook(@PathVariable Long id, @RequestBody Book bookDetails) {
        bookValidator.checkInputValue(bookDetails.getTitle(), bookDetails.getAuthor(), bookDetails.getDate(),
                bookDetails.getGenres(), bookDetails.getCharacters(), bookDetails.getSynopsis());
        Book updatedBook = bookService.updateBook(id, bookDetails);
        return ResponseEntity.ok(updatedBook);
    }

    // delete book rest api
    @DeleteMapping("/books/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteBook(@PathVariable Long id) {
        bookService.deleteBook(id);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
