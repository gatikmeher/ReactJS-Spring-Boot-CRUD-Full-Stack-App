import React, { Component } from 'react'
import BookService from '../services/BookService';

class UpdateBookComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            title: '',
            author: '',
            date: '',
            genres: '',
            characters: '',
            synopsis: '',
        }
        this.changeTitleHandler = this.changeTitleHandler.bind(this);
        this.changeAuthorHandler = this.changeAuthorHandler.bind(this);
        this.updateBook = this.updateBook.bind(this);
    }

    componentDidMount(){
        BookService.getBookById(this.state.id).then( (res) =>{
            let book = res.data;
            console.log(book);
            this.setState({title: book.title,
                date: book.date,
                genres: book.genres,
                author : book.author,
                characters: book.characters,
                synopsis: book.synopsis
            });
        });
    }

    updateBook = (e) => {
        e.preventDefault();
        let book = {title: this.state.title, date: this.state.date, author: this.state.author, 
            genres: this.state.genres, characters: this.state.characters, synopsis: this.state.synopsis};
        console.log('book => ' + JSON.stringify(book));
        console.log('id => ' + JSON.stringify(this.state.id));
        BookService.updateBook(book, this.state.id).then( res => {
            this.props.history.push('/books');
        });
    }
    
    changeTitleHandler= (event) => {
        this.setState({title: event.target.value});
    }

    changeAuthorHandler= (event) => {
        this.setState({author: event.target.value});
    }

    changeDateHandler= (event) => {
        this.setState({date: event.target.value});
    }

    changeGenresHandler= (event) => {
        this.setState({genres: event.target.value});
    }

    changecharactersHandler= (event) => {
        this.setState({character: event.target.value});
    }

    changeSynopsisHandler= (event) => {
        this.setState({synopsis: event.target.value});
    }

    cancel(){
        this.props.history.push('/books');
    }


    render() {
        return (
            <div>
                 <h3 className="text-center"> Update Book</h3>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                <h3 className="text-center">Update Book</h3>
                                <div className = "card-body">
                                    <form>
                                    <div className = "form-group">
                                            <label> Name: </label>
                                            <input placeholder="Title" name="title" className="form-control" 
                                                value={this.state.title} onChange={this.changeTitleHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Date: </label>
                                            <input placeholder="Date" name="date" className="form-control" 
                                                value={this.state.date} onChange={this.changeDateHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Author: </label>
                                            <input placeholder="Author" name="author" className="form-control" 
                                                value={this.state.author} onChange={this.changeAuthorHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Genres: </label>
                                            <input placeholder="Genres" name="genres" className="form-control" 
                                                value={this.state.genres} onChange={this.changeGenresHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> characters: </label>
                                            <textarea placeholder="characters" name="characters" className="form-control" 
                                                value={this.state.characters} onChange={this.changecharactersHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Synopsis: </label>
                                            <textarea placeholder="Synopsis" name="synopsis" className="form-control" 
                                                value={this.state.synopsis} onChange={this.changeSynopsisHandler} />
                                        </div>

                                        <button className="btn btn-success" onClick={this.updateBook}>Save</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
        )
    }
}

export default UpdateBookComponent
