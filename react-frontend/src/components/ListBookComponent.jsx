import React, { Component } from 'react'
import BookService from '../services/BookService'

class ListBookComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            books: []
        }
        this.addBook = this.addBook.bind(this);
        this.editBook = this.editBook.bind(this);
        this.deleteBook = this.deleteBook.bind(this);
    }

    deleteBook(id) {
        BookService.deleteBook(id).then(res => {
            this.setState({ books: this.state.books.filter(book => book.id !== id) });
        });
    }
    viewBook(id) {
        this.props.history.push(`/view-book/${id}`);
    }
    editBook(id) {
        this.props.history.push(`/add-book/${id}`);
    }

    componentDidMount() {
        BookService.getBooks().then((res) => {
            this.setState({ books: res.data });
        });
    }

    addBook() {
        this.props.history.push('/add-book/_add');
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Books List</h2>
                <div className="row">
                    <button className="btn btn-primary" onClick={this.addBook}> Add Book</button>
                </div>
                <br></br>
                <div className="row">
                    <table className="table table-striped table-bordered">

                        <thead>
                            <tr>
                                <th> Title</th>
                                <th> Author</th>
                                <th> Synopsis</th>
                                <th> Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.books.map(
                                    book =>
                                        <tr key={book.id}>
                                            <td> {book.title} </td>
                                            <td> {book.author}</td>
                                            <td> {book.synopsis}</td>
                                            <td>
                                                <button onClick={() => this.editBook(book.id)} className="btn btn-info">Update </button>
                                                <button style={{ marginLeft: "10px" }} onClick={() => this.deleteBook(book.id)} className="btn btn-danger">Delete </button>
                                                <button style={{ marginLeft: "10px" }} onClick={() => this.viewBook(book.id)} className="btn btn-info">View </button>
                                            </td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default ListBookComponent
