import React, { Component } from 'react'
import ToDo from './ToDoMain'
import './ToDoList.css'


export default class ToDoList extends Component {


    render() {
        const todoElements = this.props.todos.map((todo => 
                    <tr>
                        <td> 
                            <input 
                                type="checkbox" 
                                name="task"
                                checked={todo.complete}
                                onChange={ () => this.props.changeTodo(todo) }
                            /> 
                        </td>
                        <td>
                            {todo.task}
                        </td>
                    </tr>
            ))
        return ( todoElements )
    }
}