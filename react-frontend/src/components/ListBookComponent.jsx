import React, { Component } from "react";
import BookService from "../services/BookService";
import "font-awesome/css/font-awesome.min.css";
import { Table, Pagination } from "react-bootstrap";
import xml2js from 'xml2js';

class ListBookComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      books: [],
      booksToBeShown: [],
      currentPage: 1,
      outputFormat: 'json',
      page: 0
    };
    this.state.searchSelection = "title";
    this.addBook = this.addBook.bind(this);
    this.editBook = this.editBook.bind(this);
    this.deleteBook = this.deleteBook.bind(this);
    this.searchBook = this.searchBook.bind(this);
  }

  deleteBook(id) {
    BookService.deleteBook(id).then((res) => {
      this.setState({
        books: this.state.books.filter((book) => book.id !== id),
      });
    });
  }
  viewBook(id) {
    this.props.history.push(`/view-book/${id}`);
  }
  editBook(id) {
    this.props.history.push(`/update-book/${id}`);
  }

  componentDidMount() {
      BookService.getBooks(null, null, 0, this.state.outputFormat).then((res) => {
        console.log("Res data componetDidmOunt 1: " + res.data);
        this.setState({
          books: res.data.content,
          pageSize: 10,
          booksToBeShown: [],
          pageArray: [],
        });
        this.calculatePaginationDetails(1);
      });
        this.calculatePaginationDetails(1);
  }

  // Pagination Implementation
  calculatePaginationDetails = (page) => {
    console.log("Page: " + page);
    let books = this.state.books;
    let total = books.length;
    let pages = Math.floor(books.length / this.state.pageSize + 1);
    let firstPage = 1;
    let lastPage = pages;
    let pageArray = [];
    let booksToBeShown = [];
    let currentPage = 1;
    if (page.toString().toLowerCase().indexOf("previous") > 0) {
      currentPage = this.state.currentPage - 1;
      if (currentPage < 1) {
        currentPage = 1;
      }
    } else if (page.toString().toLowerCase().indexOf("next") > 0) {
      currentPage = this.state.currentPage + 1;
      if (currentPage > pages) {
        currentPage = pages;
      }
    } else if (page.toString().toLowerCase().indexOf("first") > 0) {
      currentPage = 1;
    } else if (page.toString().toLowerCase().indexOf("last") > 0) {
      currentPage = pages;
    } else {
      currentPage = parseInt(page);
    }
    console.log(parseInt(page));
    console.log(currentPage);
    for (let i = currentPage; i <= currentPage + 4; i++) {
      if (i <= pages) pageArray.push(i);
    }
    let currentItemIndex = (currentPage - 1) * this.state.pageSize;
    for (
      let i = currentItemIndex;
      i < currentItemIndex + 10 && i <= total - 1;
      i++
    ) {
      booksToBeShown.push(books[i]);
    }
    let updatedState = {
      booksToBeShown: booksToBeShown,
      pageArray: pageArray,
      firstPage: firstPage,
      lastPage: lastPage,
      currentPage: currentPage,
    };
    console.log(updatedState);
    this.setState({
      booksToBeShown: booksToBeShown,
      pageArray: pageArray,
      firstPage: firstPage,
      lastPage: lastPage,
      currentPage: currentPage,
    });
  };

  // Handle Pagination
  handlePagination = (e) => {
    e.preventDefault();
    console.log(e.target);
    if (e.target.text !== 'undefined') {
      this.calculatePaginationDetails(e.target.text);
    }
  };

  searchBook() {
    console.log("searchSelection: " + this.state.searchSelection);    
    if(this.state.page === 'undefined') {this.state.page = 0}  
    BookService.getBooks(
      this.state.searchSelection,
      this.state.searchText,
      this.state.page,
      this.state.outputFormat
    ).then((res) => {
      if(this.state.outputFormat === 'json') {
        this.setState({ books: res.data.content });
      } else {
        var parser = new xml2js.Parser();
        let finalData = [];
        parser.parseString(res.data, function(err, printData) {
          console.log("Res data componetDidmOunt 2: " + JSON.stringify(printData['PageImpl'].content[0].content));
          if(printData['PageImpl'].content[0] === 'undefined') {
            finalData = [];
          } else {
            finalData = printData['PageImpl'].content[0].content;
          }          
        })
        this.setState({
            books: finalData,
            pageSize: 10,
            booksToBeShown: [],
            pageArray: [],
          });
      }
      
    });
  }

  searchSelectionChanged = (event) => {
    console.log("searchSelection: " + event.target.value);
    this.state.searchSelection = event.target.value;
    // this.setState({searchSelection: event.target.value});
  };

  searchTextChanged = (event) => {
    console.log("searchText: " + event.target.value);
    this.state.searchText = event.target.value;
    // this.setState({searchSelection: event.target.value});
  };

  outputFormatChanged = (event) => {
    console.log("outputFormat: " + event.target.value);
    this.state.outputFormat = event.target.value;
    // this.setState({searchSelection: event.target.value});
  };

  addBook() {
    this.props.history.push("/add-book/_add");
  }

  render() {
    if(this.state.outputFormat === 'json') {
      return (
        <div>
          <h2 className="text-center" style={{ marginTop: "20px" }}>
            Books List
          </h2>
          <div className="row" style={{ marginTop: "20px" }}>
            <button className="btn btn-primary" onClick={this.addBook}>
              {" "}
              Add Book
            </button>{" "}
            &nbsp;&nbsp;&nbsp;
            <div>
              <select className="form-control"
              id={this.state.outputFormat}
              onChange={this.outputFormatChanged}
              > 
              <option
                    value="json"
                    name="json"
                    selected={this.state.outputFormat == "json" ? "selected" : false}
                  >
                    JSON
                  </option>
                  <option
                    value="xml"
                    name="xml"                  
                    selected={this.state.outputFormat == "xml" ? "selected" : false}
                  >
                    XML
                  </option>
                  <option
                    value="csv"
                    name="csv"
                    selected={this.state.outputFormat == "csv" ? "selected" : false}
                  >
                    CSV
                  </option>
              </select>
            </div>
          </div>
  
          <br></br>
          <div className="row">
            <div className="input-group mb-3">
              <div>
                <select
                  className="form-control"
                  id={this.state.searchSelection}
                  onChange={this.searchSelectionChanged}
                >
                  <option
                    value="title"
                    name="title"
                    selected={this.state.searchSelection == "title" ? "selected" : false}
                  >
                    Title
                  </option>
                  <option
                    value="genres"
                    name="genres"                  
                    selected={this.state.searchSelection == "genres" ? "selected" : false}
                  >
                    Genres
                  </option>
                  <option
                    value="date"
                    name="date"
                    selected={this.state.searchSelection == "date" ? "selected" : false}
                  >
                    Date
                  </option>
                </select>
              </div>
              &nbsp;&nbsp;&nbsp;
              <input
                placeholder="Search"
                id="searchText"
                className="form-control"
                value={this.state.searchText}
                onChange={this.searchTextChanged}
              />{" "}
              &nbsp;&nbsp;&nbsp;
              <button
                className="btn btn-primary"
                onClick={() => this.searchBook()}
              >
                {" "}
                Search
              </button>{" "}
              &nbsp;&nbsp;&nbsp;
            </div>
          </div>
          {/* <div>
            <button className="btn btn-primary" style={{ marginLeft: "230px" }}>
              Prev
            </button>
            <input className="btn" type="text" placeholder="1 - 50" />
            <button className="btn btn-primary" style={{ marginLeft: "1px" }}>
              Next
            </button>
          </div> */}
  
          <div style={{ marginLeft: "340px" }}>
            <Pagination>
              <Pagination.First onClick={(e) => this.handlePagination(e)} />
              <Pagination.Prev onClick={(e) => this.handlePagination(e)} />
              {this.state.pageArray &&
                this.state.pageArray.length &&
                this.state.pageArray.map((item) => (
                  <Pagination.Item
                    key={item}
                    onClick={(e) => this.handlePagination(e)}
                    active={this.state.currentPage === item}
                  >
                    {item}
                  </Pagination.Item>
                ))}
              <Pagination.Next onClick={(e) => this.handlePagination(e)} />
              <Pagination.Last onClick={(e) => this.handlePagination(e)} />
            </Pagination>
          </div>              
          <div className="row">
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th> Title</th>
                  <th> Author</th>
                  <th> Date</th>
                  <th> Genres</th>
                </tr>
              </thead>
              <tbody>
                {this.state.books.map((book) => (
                  <tr key={book.id}>
                    <td> {book.title} </td>
                    <td> {book.author}</td>
                    <td> {book.date}</td>
                    <td>
                      {" "}
                      <p>
                        {book.genres}
                      </p>                      
                    </td>
                    <td>
                      <button
                        style={{
                          backgroundColor: "#c2a8a7",
                          boxShadow:
                            "0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)",
                        }}
                        onClick={() => this.editBook(book.id)}
                        className="btn"
                      >
                        Update{" "}
                      </button>
                      <button
                        style={{
                          paddingRight: "15px",
                          paddingLeft: "15px",
                          backgroundColor: "#d1483f",
                          marginTop: "5px",
                          boxShadow:
                            "0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)",
                        }}
                        onClick={() => this.deleteBook(book.id)}
                        className="btn"
                      >
                        Delete{" "}
                      </button>
                      <button
                        style={{
                          backgroundColor: "#5cd15a",
                          paddingRight: "21px",
                          paddingLeft: "21px",
                          marginTop: "5px",
                          boxShadow:
                            "0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)",
                        }}
                        onClick={() => this.viewBook(book.id)}
                        className="btn"
                      >
                        View{" "}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    } else if(this.state.outputFormat === 'xml') {
      console.log("Content: " + this.state.books)
      return (
        <div>
          <h2 className="text-center" style={{ marginTop: "20px" }}>
            Books List
          </h2>
          <div className="row" style={{ marginTop: "20px" }}>
            <button className="btn btn-primary" onClick={this.addBook}>
              {" "}
              Add Book
            </button>{" "}
            &nbsp;&nbsp;&nbsp;
            <div>
              <select className="form-control"
              id={this.state.outputFormat}
              onChange={this.outputFormatChanged}
              > 
              <option
                    value="json"
                    name="json"
                    selected={this.state.outputFormat == "json" ? "selected" : false}
                  >
                    JSON
                  </option>
                  <option
                    value="xml"
                    name="xml"                  
                    selected={this.state.outputFormat == "xml" ? "selected" : false}
                  >
                    XML
                  </option>
                  <option
                    value="csv"
                    name="csv"
                    selected={this.state.outputFormat == "csv" ? "selected" : false}
                  >
                    CSV
                  </option>
              </select>
            </div>
          </div>
  
          <br></br>
          <div className="row">
            <div className="input-group mb-3">
              <div>
                <select
                  className="form-control"
                  id={this.state.searchSelection}
                  onChange={this.searchSelectionChanged}
                >
                  <option
                    value="title"
                    name="title"
                    selected={this.state.searchSelection == "title" ? "selected" : false}
                  >
                    Title
                  </option>
                  <option
                    value="genres"
                    name="genres"                  
                    selected={this.state.searchSelection == "genres" ? "selected" : false}
                  >
                    Genres
                  </option>
                  <option
                    value="date"
                    name="date"
                    selected={this.state.searchSelection == "date" ? "selected" : false}
                  >
                    Date
                  </option>
                </select>
              </div>
              &nbsp;&nbsp;&nbsp;
              <input
                placeholder="Search"
                id="searchText"
                className="form-control"
                value={this.state.searchText}
                onChange={this.searchTextChanged}
              />{" "}
              &nbsp;&nbsp;&nbsp;
              <button
                className="btn btn-primary"
                onClick={() => this.searchBook()}
              >
                {" "}
                Search
              </button>{" "}
              &nbsp;&nbsp;&nbsp;
            </div>
          </div>
          {/* <div>
            <button className="btn btn-primary" style={{ marginLeft: "230px" }}>
              Prev
            </button>
            <input className="btn" type="text" placeholder="1 - 50" />
            <button className="btn btn-primary" style={{ marginLeft: "1px" }}>
              Next
            </button>
          </div> */}
  
          <div style={{ marginLeft: "340px" }}>
            <Pagination>
              <Pagination.First onClick={(e) => this.handlePagination(e)} />
              <Pagination.Prev onClick={(e) => this.handlePagination(e)} />
              {this.state.pageArray &&
                this.state.pageArray.length &&
                this.state.pageArray.map((item) => (
                  <Pagination.Item
                    key={item}
                    onClick={(e) => this.handlePagination(e)}
                    active={this.state.currentPage === item}
                  >
                    {item}
                  </Pagination.Item>
                ))}
              <Pagination.Next onClick={(e) => this.handlePagination(e)} />
              <Pagination.Last onClick={(e) => this.handlePagination(e)} />
            </Pagination>
          </div>              
          <div className="row">
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th> Title</th>
                  <th> Author</th>
                  <th> Date</th>
                  <th> Genres</th>
                </tr>
              </thead>
              <tbody>
                {this.state.books.map((book) => (
                  <tr key={book.id}>
                    <td> {book.title} </td>
                    <td> {book.author}</td>
                    <td> {book.date}</td>                    
                    <td>
                      <p>
                        {book.genres}
                      </p>                      
                    </td>
                    <td>
                      <button
                        style={{
                          backgroundColor: "#c2a8a7",
                          boxShadow:
                            "0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)",
                        }}
                        onClick={() => this.editBook(book.id)}
                        className="btn"
                      >
                        Update{" "}
                      </button>
                      <button
                        style={{
                          paddingRight: "15px",
                          paddingLeft: "15px",
                          backgroundColor: "#d1483f",
                          marginTop: "5px",
                          boxShadow:
                            "0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)",
                        }}
                        onClick={() => this.deleteBook(book.id)}
                        className="btn"
                      >
                        Delete{" "}
                      </button>
                      <button
                        style={{
                          backgroundColor: "#5cd15a",
                          paddingRight: "21px",
                          paddingLeft: "21px",
                          marginTop: "5px",
                          boxShadow:
                            "0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)",
                        }}
                        onClick={() => this.viewBook(book.id)}
                        className="btn"
                      >
                        View{" "}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }
    
  }
}

export default ListBookComponent;
