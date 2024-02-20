import React, { Component } from 'react'
import BookService from '../services/BookService'

class ViewBookComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            book: {}
        }
        this.viewBook = this.viewBook.bind(this);
    }

    componentDidMount(){
        BookService.getBookById(this.state.id).then( res => {
            this.setState({book: res.data});
        })
    }

    viewBook(){
        this.props.history.push('/books/');
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Book Details</h2>
                 <div className = "row">
                    <button className="btn btn-primary" onClick={this.viewBook}> List Books</button>
                 </div>
                 <br></br>
                <div className = "card col-md-12 offset-md-12">
                    <h3 className = "text-center"> View Book Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <label> <b>Book Name: </b> &nbsp;</label>
                            <div> { this.state.book.name }</div>
                        </div>
                        <div className = "row">
                            <label> <b> Book Description: </b>&nbsp;</label>
                            <div> { this.state.book.description }</div>
                        </div>
                        <div className = "row">
                            <label> <b>Book Author: </b>&nbsp;</label>
                            <div> { this.state.book.author }</div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default ViewBookComponent
