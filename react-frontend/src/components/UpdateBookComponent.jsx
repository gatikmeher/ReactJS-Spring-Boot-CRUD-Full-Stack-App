import React, { Component } from 'react'
import BookService from '../services/BookService';

class UpdateBookComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            title: '',
            author: '',
            synopsis: ''
        }
        this.changeTitleHandler = this.changeTitleHandler.bind(this);
        this.changeAuthorHandler = this.changeAuthorHandler.bind(this);
        this.updateBook = this.updateBook.bind(this);
    }

    componentDidMount() {
        BookService.getBookById(this.state.id).then((res) => {
            let book = res.data;
            this.setState({
                title: book.title,
                author: book.author,
                synopsis: book.synopsis
            });
        });
    }

    updateBook = (e) => {
        e.preventDefault();
        let book = { title: this.state.title, author: this.state.author, synopsis: this.state.synopsis };
        console.log('book => ' + JSON.stringify(book));
        console.log('id => ' + JSON.stringify(this.state.id));
        BookService.updateBook(book, this.state.id).then(res => {
            this.props.history.push('/books');
        });
    }

    changeTitleHandler = (event) => {
        this.setState({ title: event.target.value });
    }

    changeAuthorHandler = (event) => {
        this.setState({ author: event.target.value });
    }

    changeSynopsisHandler = (event) => {
        this.setState({ synopsis: event.target.value });
    }

    cancel() {
        this.props.history.push('/books');
    }

    render() {
        return (
            <div>
                <h2 className="text-center">{
                    this.getTitle()
                }</h2>

                <br></br>
                <div className="row">
                    <div className="card col-md-12 offset-md-12 offset-md-12">
                        <h3 className="text-center">Update Book</h3>
                        <div className="card-body">
                            <form>
                                <div className="form-group">
                                    <label> Title: </label>
                                    <input placeholder="Title" name="title" className="form-control"
                                        value={this.state.title} onChange={this.changetitleHandler} />
                                </div>
                                <div className="form-group">
                                    <label> Author: </label>
                                    <input placeholder="Author" name="author" className="form-control"
                                        value={this.state.author} onChange={this.changeAuthorHandler} />
                                </div>
                                <div className="form-group">
                                    <label> Synopsis: </label>
                                    <input placeholder="Synopsis" name="synopsis" className="form-control"
                                        value={this.state.synopsis} onChange={this.changeSynopsisHandler} />
                                </div>

                                <button className="btn btn-success" onClick={this.updateBook}>Save</button>
                                <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{ marginLeft: "10px" }}>Cancel</button>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default UpdateBookComponent
