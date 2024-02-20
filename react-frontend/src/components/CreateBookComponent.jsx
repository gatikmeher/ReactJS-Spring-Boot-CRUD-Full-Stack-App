import React, { Component } from 'react'
import BookService from '../services/BookService';

class CreateBookComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            id: this.props.match.params.id,
            title: '',
            author: '',
            date: '',
            genres: '',
            character: '',
            synopsis: '',
            
        }
        this.changeTitleHandler = this.changeTitleHandler.bind(this);
        this.changeAuthorHandler = this.changeAuthorHandler.bind(this);
        this.saveOrUpdateBook = this.saveOrUpdateBook.bind(this);
    }

    // step 3
    componentDidMount(){

        // step 4
        if(this.state.id === '_add'){
            return
        }else{
            BookService.getBookById(this.state.id).then( (res) =>{
                let book = res.data;
                this.setState({title: book.title,
                    date: book.date,
                    genres: book.genres,
                    author : book.author,
                    character: book.character,
                    synopsis: book.synopsis
                });
            });
        }        
    }
    saveOrUpdateBook = (e) => {
        e.preventDefault();
        let book = {name: this.state.name, description: this.state.description, author: this.state.author};
        console.log('book => ' + JSON.stringify(book));

        // step 5
        if(this.state.id === '_add'){
            BookService.createBook(book).then(res =>{
                this.props.history.push('/books');
            });
        }else{
            BookService.updateBook(book, this.state.id).then( res => {
                this.props.history.push('/books');
            });
        }
    }
    
    changeTitleHandler= (event) => {
        this.setState({name: event.target.value});
    }

    changeAuthorHandler= (event) => {
        this.setState({description: event.target.value});
    }

    changeDateHandler= (event) => {
        this.setState({author: event.target.value});
    }

    changeGenresHandler= (event) => {
        this.setState({description: event.target.value});
    }

    changeCharacterHandler= (event) => {
        this.setState({description: event.target.value});
    }

    changeSynopsisHandler= (event) => {
        this.setState({description: event.target.value});
    }

    cancel(){
        this.props.history.push('/books');
    }

    render() {
        return (
            <div>
                <h3 className="text-center"> Add Book</h3>                 
                 <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-12 offset-md-12 offset-md-12">                               
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
                                                value={this.state.description} onChange={this.changeAuthorHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Author: </label>
                                            <input placeholder="Author" name="author" className="form-control" 
                                                value={this.state.author} onChange={this.changeDateHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Genres: </label>
                                            <input placeholder="Genres" name="genres" className="form-control" 
                                                value={this.state.genres} onChange={this.changeGenresHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Character: </label>
                                            <input placeholder="Character" name="character" className="form-control" 
                                                value={this.state.character} onChange={this.changeCharacterHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Synopsis: </label>
                                            <input placeholder="Synopsis" name="synopsis" className="form-control" 
                                                value={this.state.synopsis} onChange={this.changeSynopsisHandler}/>
                                        </div>
                                        <button className="btn btn-success" onClick={this.saveOrUpdateBook}>Save</button>
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

export default CreateBookComponent
