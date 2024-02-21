import React, { Component } from "react";
import BookService from "../services/BookService";
import "font-awesome/css/font-awesome.min.css";
import Dropdown from "react-bootstrap/Dropdown";

class ListBookComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      books: [],
    };
    this.addBook = this.addBook.bind(this);
    this.editBook = this.editBook.bind(this);
    this.deleteBook = this.deleteBook.bind(this);
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
    BookService.getBooks().then((res) => {
      this.setState({ books: res.data.content });
    });
  }

  addBook() {
    this.props.history.push("/add-book/_add");
  }

  render() {
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
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Datatype
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">JSON</Dropdown.Item>
              <Dropdown.Item href="#/action-2">XML</Dropdown.Item>
              <Dropdown.Item href="#/action-3">TEXT</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <div>
            <button className="btn btn-primary" style={{ marginLeft: "230px" }}>
              Prev
            </button>
            <input className="btn" type="text" placeholder="1 - 50" />
            <button className="btn btn-primary" style={{ marginLeft: "1px" }}>
              Next
            </button>
          </div>
        </div>

        <br></br>
        <div className="row">
          <div class="input-group mb-3">
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Search Field
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Title</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Genres</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Date</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            &nbsp;&nbsp;&nbsp;
            <input
              placeholder="Search"
              name="title"
              className="form-control"
              value={this.state.title}
              onChange={this.changeTitleHandler}
            />{" "}
            &nbsp;&nbsp;&nbsp;
            <button className="btn btn-primary"> Search</button>{" "}
            &nbsp;&nbsp;&nbsp;
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
                <th> Characters</th>
                <th> Synopsis</th>
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
                    <p
                      style={{
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        display: "-webkit-box",
                      }}
                    >
                      {book.genres}
                    </p>
                    <button
                      style={{
                        border: "none",
                        backgroundColor: "#8a8adb",
                        borderRadius: "5px",
                      }}
                    >
                      Read More...
                    </button>
                  </td>
                  <td>
                    {" "}
                    <p
                      style={{
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        display: "-webkit-box",
                      }}
                    >
                      {book.characters}
                    </p>
                    <button
                      style={{
                        border: "none",
                        backgroundColor: "#8a8adb",
                        borderRadius: "5px",
                      }}
                    >
                      Read More...
                    </button>
                  </td>
                  <td>
                    {" "}
                    <p
                      style={{
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        display: "-webkit-box",
                      }}
                    >
                      {book.synopsis}
                    </p>
                    <button
                      style={{
                        border: "none",
                        backgroundColor: "#8a8adb",
                        borderRadius: "5px",
                      }}
                    >
                      Read More...
                    </button>
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

export default ListBookComponent;
