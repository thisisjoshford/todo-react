import React, { Component } from 'react'
import request from 'superagent'
import ToDoList from './ToDoList.js'



//shortid for generating ID's
const shortid = require('shortid');

export default class ToDo extends Component {

    //initializing state to an empty array
    state = { todos: []}

    //when this component mounts... do the stuff
    componentDidMount = async() => {
        //get the user from local storage
        const user = JSON.parse(localStorage.getItem('user'));
        //hit the api with the user token and update state with that users todos on the backend
        const todos = await request.get('https://shielded-eyrie-03811.herokuapp.com/api/todos').set('Authorization', user.token);
        this.setState({ todos: todos.body })
    }
    
    //defining the add a todo method
    handleAddTodo = async() => {
        //a new todo will consist of an ID randomly created with shortid npm library, the todo "task" and default state of todo 
        const newTodo = {
            id: shortid.generate(),
            task: this.state.todoInput,
            complete: false
        };
        //get the userinfo from the todos
        const user = JSON.parse(localStorage.getItem('user'));

        //newTodos array is now created by grabbing all the old todos (spread array/props function) and adding the newest todo
        const newTodos = [...this.state.todos, newTodo];

        //update the todos state to the new array of todos and hit the back end with that data
        this.setState({ todos: newTodos});
        const data = await request.post('https://shielded-eyrie-03811.herokuapp.com/api/todos', {
            task: this.state.todoInput
        })
            .set('Authorization', user.token);
    }

    handleChange = async(todo) => {
        const newTodos = this.state.todos.slice();
        const todoMatch = newTodos.find((thisTodo) => todo.id === thisTodo.id);

        console.log(todo.complete)
        todoMatch.complete = !todo.complete
        console.log(todoMatch.complete)

        const user = JSON.parse(localStorage.getItem('user'));
        this.setState({ todos: newTodos});
        const data = await request.put(`https://shielded-eyrie-03811.herokuapp.com/api/todos/${todo.id}`, todoMatch)
        .set('Authorization', user.token);
    }

    handleDelete = async() => {
        const user = JSON.parse(localStorage.getItem('user'));
        // const deleteTodo = await request.delete(`https://shielded-eyrie-03811.herokuapp.com/api/auth/signin/api/todos${todo.Id}`)
        // .set('Authorization', user.token);
    }

    handleInput = (e) => { this.setState({ todoInput: e.target.value})};

    handleLogout = (e) => {localStorage.clear(); window.location = ('/')};

    render() {
        return (
            <div>

                <input value={this.todoInput} onChange={this.handleInput} />

                <button onClick={this.handleAddTodo}>ADD</button>

                <div id="todoList">
                    <fieldset>
                        <legend>Shit I Gotta Crush Out!</legend>
                        <table>
                            <tr>
                                <th>Crushed?</th>
                                <th>Thing to Crush</th>
                            </tr>
                            <ToDoList todos={this.state.todos} changeTodo={this.handleChange}/>
                        </table> 
                    </fieldset>
                </div>
                <button onCLick={this.handleDelete}>DELETE SELECTED</button>
                <br></br>
                <button onClick={this.handleLogout}>LOGOUT</button>
            </div>
            
        )
    }
}
