import React, { useState, useEffect } from 'react'
import { fetchTodoList } from '@/utils/functions'
import { TodoListType } from '@/types/type'

const TodoList = () => {
  const [todos, setTodos] = useState([] as TodoListType)
  useEffect(() => {
    //   TODO try catch
    async function fetchTodoAPI() {
      const res = await fetch('http://localhost:8000/api/todos/')
      const todoJson: TodoListType = await res.json()
      setTodos(todoJson)
    }
    fetchTodoAPI()
  }, [])
  return (
    <div>
      <ul>
        {todos.map(todo => {
          ;<li key={todo.id}>
            {todo.title}: {todo.content}
          </li>
        })}
      </ul>
    </div>
  )
}

export default TodoList
