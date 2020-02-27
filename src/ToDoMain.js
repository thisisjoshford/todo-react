import React, { Component } from 'react'
import request from 'superagent'
import ToDoList from './ToDoList.js'


//shortid for generating ID's
const shortid = require('shortid');

export default class ToDo extends Component {

    state = { todos: []}

    componentDidMount = async() => {
        const user = JSON.parse(localStorage.getItem('user'));
        const todos = await request.get('https://shielded-eyrie-03811.herokuapp.com/api/todos').set('Authorization', user.token);

        this.setState({ todos: todos.body })
    }

    handleClick = async() => {
        const newTodo = {
            id: shortid.generate(),
            task: this.state.todoInput,
            complete: false
        };

        const user = JSON.parse(localStorage.getItem('user'));

        const newTodos = [...this.state.todos, newTodo];

        this.setState({ todos: newTodos});
        const data = await request.post('https://shielded-eyrie-03811.herokuapp.com/api/todos', {
            task: this.state.todoInput
        })
            .set('Authorization', user.token)
    }

    handleChange = async() => {
        const changeTodo = await request.put(`https://shielded-eyrie-03811.herokuapp.com/api/auth/signin/api/todos${this.state.match.params}`)
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
