package org.project.springboot.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import jakarta.validation.Valid;
import org.project.springboot.exception.ResourceNotFoundException;
import org.project.springboot.repository.BookRepository;
import org.project.springboot.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.data.web.SpringDataWebProperties;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.project.springboot.model.Book;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/book-project/bookapi")
public class BookController {

	@Autowired
	private BookRepository bookRepository;

    @Autowired
    private BookService bookService;
	
	// get all books
	@GetMapping("/books")
	public ResponseEntity<Object> getAllBooks(@RequestParam(required = false, name = "page") Integer page,
								  @RequestParam(required = false, name = "size") Integer size,
								  @RequestParam(required = false, name = "title") String title,
								  @RequestParam(required = false, name = "date") String date,
								  @RequestParam(required = false, name = "genres") String genres){
		page = null == page ? 0 : page;
		size = null == size ? 25 : size;
        Pageable pageable  = PageRequest.of(page.intValue(), size.intValue());
		return ResponseEntity.ok().body(bookService.findAllBook(title, date, genres, pageable));
	}		
	
	// create book rest api
	@PostMapping("/books")
	public ResponseEntity<Object> insertBook(@Valid @RequestBody Book book) {
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
	public ResponseEntity<Book> updateBook(@PathVariable Long id, @RequestBody Book bookDetails){
		Book updatedBook = bookService.updateBook(id, bookDetails);
		return ResponseEntity.ok(updatedBook);
	}
	
	// delete book rest api
	@DeleteMapping("/books/{id}")
	public ResponseEntity<Map<String, Boolean>> deleteBook(@PathVariable Long id){
		bookService.deleteBook(id);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
}
