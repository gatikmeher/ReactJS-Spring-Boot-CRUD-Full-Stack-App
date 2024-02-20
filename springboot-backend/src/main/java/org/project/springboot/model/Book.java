package org.project.springboot.model;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "books")
public class Book {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Long id;
	
	@Column(name = "title")
	private String title;

	@Column(name = "author")
	private String author;

	@Column(name = "synopsis")
	private String synopsis;

	@Column(name = "date")
	private String date;

	@Column(name = "genres")
	private String genres;

	@Column(name = "characters")
	private String characters;

}
