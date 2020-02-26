import React, { Component } from 'react'
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import ToDoMain from './ToDoMain.js';

export default class App extends Component {
  render() {
    return (
      <div>
        <header>
          <h1>My Super Awesome 100% Original TODO App!</h1>
          <h4>Now with 25% MORE TODOs!</h4>
        </header>
        <hr/>
        <Router>
            <Route exact path="/" component={ ToDoMain }/>
        </Router>
        
      </div>
    )
  }
}

