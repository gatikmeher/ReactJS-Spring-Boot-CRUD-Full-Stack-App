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
        this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
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
                    firstName: book.firstName,
                    lastName: book.lastName,
                    emailId: book.emailId
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

    changeFirstNameHandler = (event) => {
        this.setState({ firstName: event.target.value });
    }

    changeLastNameHandler = (event) => {
        this.setState({ lastName: event.target.value });
    }

    changeEmailHandler = (event) => {
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
                <br></br>
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            {
                                this.getTitle()
                            }
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label> First Name: </label>
                                        <input placeholder="First Name" name="firstName" className="form-control"
                                            value={this.state.firstName} onChange={this.changeFirstNameHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label> Last Name: </label>
                                        <input placeholder="Last Name" name="lastName" className="form-control"
                                            value={this.state.lastName} onChange={this.changeLastNameHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label> Email Id: </label>
                                        <input placeholder="Email Address" name="emailId" className="form-control"
                                            value={this.state.emailId} onChange={this.changeEmailHandler} />
                                    </div>

                                    <button className="btn btn-success" onClick={this.saveOrUpdateBook}>Save</button>
                                    <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{ marginLeft: "10px" }}>Cancel</button>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default CreateBookComponent
