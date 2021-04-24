import React, { useState, useEffect } from 'react'
import { get, post } from '@/utils/functions'
import { TodoListType, TodoType } from '@/types/type'

interface TodoInputEvent extends React.FormEvent<HTMLInputElement> {
  target: HTMLInputElement
}
interface TodoTextAreaEvent extends React.FormEvent<HTMLTextAreaElement> {
  target: HTMLTextAreaElement
}

const API = 'http://localhost:8000/api/todos/'
const TodoList = () => {
  const [todos, setTodos] = useState([] as TodoListType)
  const initialEditTodo = {
    id: '',
    title: '',
    content: '',
  }
  const [editTodo, setEditTodo] = useState(initialEditTodo)
  useEffect(() => {
    //   TODO try catch
    async function fetchTodoAPI() {
      const todoJson: TodoListType = await get(API)
      setTodos(todoJson)
    }
    fetchTodoAPI()
  }, [])
  const handleInputChange = (event: TodoInputEvent) => {
    const name = event.target.name
    const value = event.target.value
    setEditTodo({ ...editTodo, [name]: value })
  }
  const handleTextAreaChange = (event: TodoTextAreaEvent) => {
    const name = event.target.name
    const value = event.target.value
    setEditTodo({ ...editTodo, [name]: value })
  }
  const createNewTodo = () => {
    //   TODO try catch
    async function fetchCreateTodo(editTodo: TodoType) {
      const todoJson = await post(API, editTodo)
      console.log(todoJson)

      setTodos([todoJson, ...todos])
      setEditTodo({ id: '', title: '', content: '' })
    }
    fetchCreateTodo(editTodo)
  }
  return (
    <div>
      <div className="container">
        {/* TODO: Material-UI */}
        <input
          className="form-control"
          type="text"
          name="title"
          placeholder="title"
          value={editTodo.title}
          data-item={editTodo.title}
          onChange={event => handleInputChange(event)}
          required
        />
        <br />
        <textarea
          className="form-control"
          name="content"
          placeholder="content"
          value={editTodo.content}
          onChange={event => handleTextAreaChange(event)}
          required
        />
        <br />
      </div>
      <button onClick={() => createNewTodo()} className="btn btn-primary">
        新規作成
      </button>
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
