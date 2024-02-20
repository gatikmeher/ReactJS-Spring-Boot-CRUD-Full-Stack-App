import React, { Component } from 'react'
import BookService from '../services/BookService'

class ViewBookComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            book: {}
        }
    }

    componentDidMount() {
        BookService.getBookById(this.state.id).then(res => {
            this.setState({ book: res.data });
        })
    }

    getTitle() {
        return <h3 className="text-center">Book Details</h3>

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
                <div className="card col-md-12 offset-md-12">
                    <h3 className="text-center"> View Book Details</h3>
                    <div className="card-body">
                        <div className="row">
                            <label> <b>Title: </b></label>
                            &nbsp;
                            <div> <p> {this.state.book.title}</p></div>
                        </div>
                        <div className="row">
                            <label> <b>Author: </b></label>
                            &nbsp;
                            <div> <p>{this.state.book.author}</p></div>
                        </div>
                        <div className="row">
                            <label> <b>Synopsis: </b></label>
                            <div><p> {this.state.book.synopsis}</p></div>
                        </div>
                    </div>

                </div>
                <br></br>
                <button className="btn btn-primary" onClick={this.cancel.bind(this)} style={{ marginLeft: "10px" }}>Back</button>
            </div>
        )
    }
}

export default ViewBookComponent
