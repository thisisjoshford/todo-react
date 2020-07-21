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
                                className="checkbox"
                                checked={todo.complete}
                                onChange={ () => this.props.change(todo) }
                            /> 
                        </td>
                        <td className={todo.complete ? 'complete' : 'incomplete'}>
                            {todo.task}
                        </td>
                        <td>
                            <button 
                            className="delete"
                            onClick={ () => this.props.delete(todo) }
                            >
                            </button>
                        </td>
                    </tr>
            ))
        return ( todoElements )
    }
}