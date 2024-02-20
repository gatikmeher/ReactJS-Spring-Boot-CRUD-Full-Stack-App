package org.project.springboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import org.project.springboot.model.Book;

@Repository
public interface BookRepository extends JpaRepository<Book, Long>{

}
