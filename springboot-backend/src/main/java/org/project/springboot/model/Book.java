package org.project.springboot.model;

import com.opencsv.bean.CsvBindByName;
import com.opencsv.bean.CsvBindByPosition;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
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

	@Size(min=3, max=255, message = "'title' should be minimum 3 characters and maximum 255 characters")
	@NotNull(message = "'title' cannot be null")
	@Column(name = "title")
	private String title;

	@Size(min=3, max=255, message = "'author' should be minimum 3 characters and maximum 255 characters")
	@NotNull(message = "'author' cannot be null")
	@Column(name = "author")
	private String author;

	@NotNull(message = "'synopsis' cannot be null")
	@Column(name = "synopsis")
	private String synopsis;

	@NotNull(message = "'date' cannot be null")
	@Size(min=8, max=10, message = "'date' has to be of 10 characters and in format mm/dd/yyyy")
	@Column(name = "date")
	private String date;

	@NotNull(message = "'genres' cannot be null")
	@Column(name = "genres")
	private String genres;

	@NotNull(message = "'characters' cannot be null")
	@Column(name = "characters")
	private String characters;

}
