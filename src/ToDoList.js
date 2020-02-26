import React, { Component } from 'react'
import request from 'superagent';

export default class ToDoList extends Component {

    state = { todos: []}

    componentDidMount = async() => {
        const todos = await request.get('http://localhost:3000/api/todos')

        this.setState({ todos: todos.body })
    }
    render() {
        
        return (
            <div>
                {this.state.todos.map((todo) => 
                <li>{todo.task}</li>
                )}
            </div>
        )
    }
}
