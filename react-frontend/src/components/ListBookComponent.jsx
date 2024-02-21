import React, { Component } from 'react'
import BookService from '../services/BookService'
import 'font-awesome/css/font-awesome.min.css'

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

    deleteBook(id){
        BookService.deleteBook(id).then( res => {
            this.setState({books: this.state.books.filter(book => book.id !== id)});
        });
    }
    viewBook(id){
        this.props.history.push(`/view-book/${id}`);
    }
    editBook(id){
        this.props.history.push(`/update-book/${id}`);
    }

    componentDidMount(){
        BookService.getBooks().then((res) => {
            this.setState({ books: res.data.content});
        });
    }

    addBook(){
        this.props.history.push('/add-book/_add');
    }

    render() {
        return (
            <div>
                 <h2 className="text-center">Books List</h2>
                 <div className = "row">
                    <button className="btn btn-primary" onClick={this.addBook}> Add Book</button> &nbsp;&nbsp;&nbsp;
                    <div class="dropdown">
                    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        Datatype
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li><a class="dropdown-item" href="#">JSON</a></li>
                        <li><a class="dropdown-item" href="#">XML</a></li>
                        <li><a class="dropdown-item" href="#">Text</a></li>
                    </ul>
                    </div>
                    
                 </div>
                 
                 <br></br>
                 <div className = "row">
                    <div class="input-group mb-3">
                    <div class="dropdown">
                    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        Search Field
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li><a class="dropdown-item" href="#">Title</a></li>
                        <li><a class="dropdown-item" href="#">Gegnres</a></li>
                        <li><a class="dropdown-item" href="#">Date</a></li>
                    </ul>
                    </div>
                    &nbsp;&nbsp;&nbsp;
                    <input placeholder="Search" name="title" className="form-control" 
                            value={this.state.title} onChange={this.changeTitleHandler}/> &nbsp;&nbsp;&nbsp;
                        <button className="btn btn-primary"> Search</button> &nbsp;&nbsp;&nbsp;
                    </div>
                    
                </div>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

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
                                {
                                    this.state.books.map(
                                        book => 
                                        <tr key = {book.id}>
                                             <td> { book.title} </td>   
                                             <td> {book.author}</td>
                                             <td> {book.date}</td>
                                             <td> {book.genres}</td>
                                             <td> {book.characters}</td>
                                             <td> {book.synopsis}</td>
                                             <td>                                        
                                                 <button onClick={ () => this.editBook(book.id)} className="btn btn-info">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteBook(book.id)} className="btn btn-danger">Delete </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewBook(book.id)} className="btn btn-secondary">View </button>
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
