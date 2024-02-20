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
                    <div className = "card-body">
                        <div className = "row">
                            <label> <b>Title: </b> &nbsp;</label>
                            <div> { this.state.book.title }</div>
                        </div>
                        <div className = "row">
                            <label> <b> Author: </b>&nbsp;</label>
                            <div> { this.state.book.author }</div>
                        </div>
                        <div className = "row">
                            <label> <b>Date: </b>&nbsp;</label>
                            <div> { this.state.book.date }</div>
                        </div>
                        <div className = "row">
                            <label> <b>Genres: </b>&nbsp;</label>
                            <div> { this.state.book.genres }</div>
                        </div>
                        <div className = "row">
                            <label> <b>Characters: </b>&nbsp;</label>
                            <div> { this.state.book.characters }</div>
                        </div>
                        <div className = "row">
                            <label> <b>Synopsis: </b>&nbsp;</label>
                            <div> { this.state.book.synopsis }</div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default ViewBookComponent
