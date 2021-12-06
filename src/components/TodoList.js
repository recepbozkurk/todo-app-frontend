import React, { useState, useEffect } from 'react'
import Todo from './Todo'
import TodoForm from './TodoForm'
import axios from 'axios'

function TodoList() {
    const serverUrl = 'https://todo-app-backend-rb.herokuapp.com'
    //const serverUrl = 'http://localhost:7070'

    useEffect(() => {
        getTodos(serverUrl)
    }, [])

    const [todos, setTodos] = useState([])

    const getTodos = async (get_url) => {
        let response = await axios.get(get_url + '/todos/get-todos')
        setTodos(response.data)
        return response.data
    }

    const addTodo = (todo) => {
        if (!todo.text || /^\s*$/.test(todo.text)) return

        axios.post(serverUrl + '/todos/create-todo', todo)
            .then(res => {
                if (res.data.status) getTodos(serverUrl)
            })
    }

    return (
        <div>
            <TodoForm onSubmit={addTodo} />
            <Todo
                todos={todos}
            />
        </div>
    )
}

export default TodoList
