import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ListBookComponent from './components/ListBookComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import CreateBookComponent from './components/CreateBookComponent';
import UpdateBookComponent from './components/UpdateBookComponent';
import ViewBookComponent from './components/ViewBookComponent';

function App() {
  return (
    <div>
      <Router>
        <HeaderComponent />
        <div className="container">
          <Switch>
            <Route path="/" exact component={ListBookComponent}></Route>
            <Route path="/books" component={ListBookComponent}></Route>
            <Route path="/add-book/:id" component={CreateBookComponent}></Route>
            <Route path="/view-book/:id" component={ViewBookComponent}></Route>
            {/* <Route path = "/update-book/:id" component = {UpdateBookComponent}></Route> */}
          </Switch>
        </div>
        <FooterComponent />
      </Router>
    </div>

  );
}

export default App;
