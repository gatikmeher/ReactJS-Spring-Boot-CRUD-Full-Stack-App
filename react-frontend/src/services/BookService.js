import axios from "axios";

const BOOK_API_BASE_URL = "http://localhost:8585/book-project/bookapi/books";

class BookService {
  getBooks() {
    return axios.get(BOOK_API_BASE_URL, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  createBook(book) {
    return axios.post(BOOK_API_BASE_URL, book);
  }

  getBookById(bookId) {
    return axios.get(BOOK_API_BASE_URL + "/" + bookId);
  }

  updateBook(book, bookId) {
    return axios.put(BOOK_API_BASE_URL + "/" + bookId, book);
  }

  deleteBook(bookId) {
    return axios.delete(BOOK_API_BASE_URL + "/" + bookId);
  }
}

export default new BookService();
