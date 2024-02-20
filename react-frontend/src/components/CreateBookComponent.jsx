import React, { Component } from 'react'
import BookService from '../services/BookService';

class CreateBookComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            id: this.props.match.params.id,
            firstName: '',
            lastName: '',
            emailId: ''
        }
        this.changeTitleHandler = this.changeTitleHandler.bind(this);
        this.changeAuthorHandler = this.changeAuthorHandler.bind(this);
        this.saveOrUpdateBook = this.saveOrUpdateBook.bind(this);
    }

    // step 3
    componentDidMount() {

        // step 4
        if (this.state.id === '_add') {
            return
        } else {
            BookService.getBookById(this.state.id).then((res) => {
                let book = res.data;
                this.setState({
                    firstName: book.title,
                    lastName: book.author,
                    emailId: book.synopsis
                });
            });
        }
    }
    saveOrUpdateBook = (e) => {
        e.preventDefault();
        let book = { firstName: this.state.firstName, lastName: this.state.lastName, emailId: this.state.emailId };
        console.log('book => ' + JSON.stringify(book));

        // step 5
        if (this.state.id === '_add') {
            BookService.createBook(book).then(res => {
                this.props.history.push('/books');
            });
        } else {
            BookService.updateBook(book, this.state.id).then(res => {
                this.props.history.push('/books');
            });
        }
    }

    changeTitleHandler = (event) => {
        this.setState({ firstName: event.target.value });
    }

    changeAuthorHandler = (event) => {
        this.setState({ lastName: event.target.value });
    }

    changeSynopsisHandler = (event) => {
        this.setState({ emailId: event.target.value });
    }

    cancel() {
        this.props.history.push('/books');
    }

    getTitle() {
        if (this.state.id === '_add') {
            return <h3 className="text-center">Add Book</h3>
        } else {
            return <h3 className="text-center">Update Book</h3>
        }
    }
    render() {
        return (
            <div>
                <h2 className="text-center">{
                    this.getTitle()
                }</h2>

                <br></br>
                <div className="row">
                    <div className="col-md-12 offset-md-12 offset-md-12">

                        <div className="card-body">
                            <form>
                                <div className="form-group">
                                    <label> Title: </label>
                                    <input placeholder="Title" name="title" className="form-control"
                                        value={this.state.title} onChange={this.changeTitleHandler} required="required" />
                                </div>
                                <div className="form-group">
                                    <label> Author: </label>
                                    <input placeholder="Author" name="author" className="form-control"
                                        value={this.state.author} onChange={this.changeAuthorHandler} />
                                </div>
                                <div className="form-group">
                                    <label> Synopsis: </label>
                                    <textarea placeholder="Synopsis" name="synopsis" className="form-control"
                                        value={this.state.synopsis} onChange={this.changeSynopsisHandler} />
                                </div>

                                <button className="btn btn-success" onClick={this.saveOrUpdateBook}>Save</button>
                                <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{ marginLeft: "10px" }}>Cancel</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CreateBookComponent
