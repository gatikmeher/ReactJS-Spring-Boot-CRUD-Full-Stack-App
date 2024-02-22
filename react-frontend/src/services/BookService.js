import axios from "axios";

const BOOK_API_BASE_URL = "http://localhost:8080/book-project/bookapi/books";
let FINAL_URL = "";

class BookService {
  FINAL_URL = BOOK_API_BASE_URL;
  getBooks(searchSelection, searchText, page, outputFormat) {
    console.log("searchSelection: " + searchSelection);
    console.log("searchText: " + searchText);
    console.log("page: " + page);
    console.log("outputFormat: " + outputFormat);
    console.log(typeof(searchSelection) !== 'undefined');
    if (page === 'undefined') {
      page = 0;
    }
    if (typeof(searchSelection) !== 'undefined' && typeof(searchText) !== 'undefined') {
      FINAL_URL = BOOK_API_BASE_URL + "?size=25&page=0&" + searchSelection + "=" + searchText
    } else {
      FINAL_URL = BOOK_API_BASE_URL + "?size=25&page=0"
    }
    if (outputFormat === "json" || outputFormat === 'undefined') {
      return axios.get(FINAL_URL, {
        headers: {
          'Output-Format': 'application/json'
        },
      });      
    } else if(outputFormat === "xml") {
      return axios.get(FINAL_URL, {
        headers: {
          'Output-Format': 'application/xml'
        },
      });
    } else {
      return axios.get(FINAL_URL, {
        headers: {
          'Output-Format': 'application/xml'
        },
      });
    }
    
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
