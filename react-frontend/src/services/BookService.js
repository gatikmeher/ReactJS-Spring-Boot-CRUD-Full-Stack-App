import axios from "axios";

let BOOK_API_BASE_URL = "http://localhost:8585/book-project/bookapi/books";

class BookService {
  getBooks(searchSelection, searchText, page) {
    console.log("searchSelection: " + searchSelection);
    console.log("searchText: " + searchText);
    console.log("page: " + page);
    if (page === "undefined") {
      page = 0;
    }
    if (searchSelection !== "undefined" && searchText !== "undefined") {
      BOOK_API_BASE_URL =
        BOOK_API_BASE_URL +
        "?size=25&page=0&" +
        searchSelection +
        "=" +
        searchText;
    }
    // if(typeof page === 'undefined') {
    //   BOOK_API_BASE_URL = BOOK_API_BASE_URL + "?size=25&page=0"
    //   console.log("Base URl1: " + BOOK_API_BASE_URL)
    // } else {
    //   BOOK_API_BASE_URL = BOOK_API_BASE_URL + "?size=25&page=" + page
    // }
    // if(searchSelection !== undefined || searchSelection != "" || searchText !== undefined || searchText != "") {
    //   BOOK_API_BASE_URL = BOOK_API_BASE_URL + "&searchSelection=" + searchText
    //   console.log("Base URl2: " + BOOK_API_BASE_URL)
    // }
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
