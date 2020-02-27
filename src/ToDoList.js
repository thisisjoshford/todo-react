import React, { Component } from 'react'
import ToDo from './ToDoMain'


export default class ToDoList extends Component {


    render() {
        const todoElements = this.props.todos.map((todo => 
            <div>
                 <li>{todo.task}</li>
                 <input type="checkbox" name="task" onChange=""/>
            </div>
           
            ))
        return ( todoElements )
    }
}