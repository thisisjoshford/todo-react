import React, { Component } from 'react'
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

import Login from './Login.js';
import ToDoMain from './ToDoMain.js';

const isLoggedIn = () => JSON.parse(localStorage.getItem('user'));

export default class App extends Component {
  render() {
    return (
      <div className="body">
        <header>
          <h1>My Super Awesome 100% Original TODO App!</h1>
          <h4>Now with 25% MORE TODOs!</h4>
        </header>
        <hr/>
        <Router>
            <Route path="/" render={() =>
            isLoggedIn() 
              ? <Route exact path="/" component={ ToDoMain }/>
              : <Redirect to='login'/>
            }/>
            <Route path='/login' component = { Login } />
            {/* // <Route exact path="/" component={ ToDoMain }/> */}
        </Router>
        
      </div>
    )
  }
}

