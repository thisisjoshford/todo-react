import React, { Component } from 'react'
import request from 'superagent'
import ToDoList from './ToDoList.js'


//shortid for generating ID's
const shortid = require('shortid');

export default class ToDo extends Component {

    state = { todos: []}

    componentDidMount = async() => {
        const todos = await request.get('http://localhost:3000/api/todos')

        this.setState({ todos: todos.body })
    }

    handleClick = async() => {
        const newTodo = {
            id: shortid.generate(),
            task: this.state.todoInput,
            complete: false
        };

        const newTodos = [...this.state.todos, newTodo];

        this.setState({ todos: newTodos});
        const data = await request.post('http://localhost:3000/api/todos', {
            task: this.state.todoInput
        });
    }

    handleInput = (e) => { this.setState({ todoInput: e.target.value})};


    render() {
        return (
            <div>
                <input value={this.todoInput} onChange={this.handleInput} />
                <button onClick={this.handleClick}>ADD</button>
                <div id="todoForm">
                    <fieldset>
                        <legend>Shit I Gotta Do!</legend>
                        <ToDoList todos={this.state.todos}/>
                    </fieldset>
                </div>
            </div>
            
        )
    }
}
