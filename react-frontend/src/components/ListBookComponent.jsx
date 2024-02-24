import React, { Component } from "react";
import BookService from "../services/BookService";
import "font-awesome/css/font-awesome.min.css";
import { Table, Pagination } from "react-bootstrap";
import xml2js from 'xml2js';
import csvtojson from 'csvtojson';

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

  clickPrevious() {
    if(this.state.page === 'undefined' || this.state.page < 0) {      
      this.state.page = 0
    }  else {
      this.state.page = this.state.page - 1
    }
    this.searchBook()
  }

  clickNext() {  
    if(this.state.page === 'undefined' || this.state.page < 0) {      
      this.state.page = 0
    } else {
      this.state.page = this.state.page + 1
    }  
    this.searchBook()    
  }

  componentDidMount() {
    BookService.getBooks(null, null, 0, this.state.outputFormat).then((res) => {
      console.log("Res data componetDidmOunt 1: " + res.data);
      this.setState({
        books: res.data.content,
        page: 0
        // pageSize: 10,
        // booksToBeShown: [],
        // pageArray: [],
      });
      // this.calculatePaginationDetails(1);
    });
    // this.calculatePaginationDetails(1);
  }

  resetList() {    
    this.state.searchText = ""
    this.componentDidMount()
  }
  
  searchBook() {
    console.log("Page # in searchBook: " + this.state.page);
    if (this.state.page === 'undefined' || this.state.page < 0) { this.state.page = 0 }
    BookService.getBooks(
      this.state.searchSelection,
      this.state.searchText,
      this.state.page,
      this.state.outputFormat
    ).then((res) => {
      if (this.state.outputFormat === 'json') {
        this.setState({ books: res.data.content });
      } else if (this.state.outputFormat === 'xml') {
        var parser = new xml2js.Parser();
        let finalData = [];
        parser.parseString(res.data, function (err, printData) {
          // console.log("Res data componetDidmOunt 2: " + JSON.stringify(printData['PageImpl'].content[0].content));
          if (printData['PageImpl'].content[0] === 'undefined') {
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
      } else if (this.state.outputFormat === 'csv') {
        // console.log("Res:" + res.data);
        csvtojson()
          .fromString(res.data)
          .then((jsonObj) => {
            // console.log("JSON: " + JSON.stringify(jsonObj));
            this.setState({ books: jsonObj });
          })
          .catch((error) => {
            console.error('Error converting CSV to JSON:', error);
          });
      }
    });
  }

  searchSelectionChanged = (event) => {
    console.log("searchSelection: " + event.target.value);    
    this.setState({searchSelection: event.target.value});
  };

  searchTextChanged = (event) => {
    console.log("searchText: " + event.target.value);
    this.setState({searchText: event.target.value});
  };

  outputFormatChanged = (event) => {
    console.log("outputFormat: " + event.target.value);
    this.setState({searchSelection: event.target.value});
  };

  addBook() {
    this.props.history.push("/add-book/_add");
  }

  render() {
    if (this.state.outputFormat === 'json') {
      return (
        <div>
          <h2 className="text-center" style={{ marginTop: "20px" }}>
            Books List
          </h2>
          <div className="row" style={{ marginTop: "20px" }}>
            <button className="btn btn-info" onClick={this.addBook}>
              Add Book
            </button>
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
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;            
            <button
                className="btn btn-info pull-right"
                onClick={() => this.resetList()}
            >
                List All Books
              </button>
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
              />
              &nbsp;&nbsp;&nbsp;
              <button
                className="btn btn-primary"
                onClick={() => this.searchBook()}
              >
                Search
              </button>
              &nbsp;&nbsp;&nbsp;
            </div>
          </div>  
          <div className="row">
            <div className="input-group mb-3">
          <button className="btn btn-secondary" style={{ marginLeft: "230px" }} onClick={() => this.clickPrevious(this.state.page)}>
              Prev
            </button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <button className="btn btn-secondary" style={{ marginLeft: "1px" }} onClick={() => this.clickNext(this.state.page)}>
              Next
            </button>
            <br></br>
            </div>
          </div>        
          <div className="row">
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                 <th width="5%"> Id</th>
                  <th width="20%">Title</th>
                  <th width="20%">Author</th>
                  <th width="5%">Date</th>
                  <th width="50%">Genres</th>
                </tr>
              </thead>
              <tbody>
                {this.state.books.map((book) => (
                    <tr key={book.id}><td> {book.id} </td>
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
                        Update
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
                        Delete
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
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    } else if (this.state.outputFormat === 'xml') {
      console.log("Content: " + this.state.books)
      return (
        <div>
          <h2 className="text-center" style={{ marginTop: "20px" }}>
            Books List
          </h2>
          <div className="row" style={{ marginTop: "20px" }}>
            <button className="btn btn-primary" onClick={this.addBook}>

              Add Book
            </button>
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
              />
              &nbsp;&nbsp;&nbsp;
              <button
                className="btn btn-primary"
                onClick={() => this.searchBook()}
              >

                Search
              </button>
              &nbsp;&nbsp;&nbsp;
            </div>
          </div>
          <div className="row">
            <div className="input-group mb-3">
          <button className="btn btn-primary" style={{ marginLeft: "230px" }} onClick={() => this.clickPrevious(this.state.page)}>
              Prev
            </button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <button className="btn btn-primary" style={{ marginLeft: "1px" }} onClick={() => this.clickNext(this.state.page)}>
              Next
            </button>
            <br></br>            
            </div>
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
                        Update
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
                        Delete
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
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    } else if (this.state.outputFormat === 'csv') {
      console.log("Content: " + this.state.books)
      return (
        <div>
          <h2 className="text-center" style={{ marginTop: "20px" }}>
            Books List
          </h2>
          <div className="row" style={{ marginTop: "20px" }}>
            <button className="btn btn-primary" onClick={this.addBook}>

              Add Book
            </button>
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
              />
              &nbsp;&nbsp;&nbsp;
              <button
                className="btn btn-primary"
                onClick={() => this.searchBook()}
              >

                Search
              </button>
              &nbsp;&nbsp;&nbsp;
            </div>
          </div>
          <div className="row">
            <div className="input-group mb-3">
          <button className="btn btn-primary" style={{ marginLeft: "230px" }} onClick={() => this.clickPrevious(this.state.page)}>
              Prev
            </button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <button className="btn btn-primary" style={{ marginLeft: "1px" }} onClick={() => this.clickNext(this.state.page)}>
              Next
            </button>
            <br></br>            
            </div>
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
                        Update
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
                        Delete
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
                        View
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
