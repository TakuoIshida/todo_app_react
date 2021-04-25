import {
  IProps,
  TodoListType,
  TodoType,
  ITodoTextAreaEvent,
  ITodoInputEvent,
  ITodoCheckBoxEvent,
} from '@/types/type'
import { postTodo } from '@/utils/functions'
import React, { useState } from 'react'
import Link from 'next/link'
import { Checkbox } from '@material-ui/core'

const TodoList: React.FC<IProps> = (props: IProps) => {
  const initialEditTodo: TodoType = {
    todoId: '',
    title: '',
    content: '',
    isDeleted: false,
  }
  // titleのみ取得でＯＫ
  const [todos, setTodos] = useState([] as TodoListType)
  console.log(props)

  const [editTodo, setEditTodo] = useState(initialEditTodo)

  const handleTitleChange = (event: ITodoInputEvent) => {
    const name = event.target.name
    const value = event.target.value
    setEditTodo({ ...editTodo, [name]: value })
  }
  const handleTextAreaChange = (event: ITodoTextAreaEvent) => {
    const name = event.target.name
    const value = event.target.value
    setEditTodo({ ...editTodo, [name]: value })
  }

  const handleIsDeleteChange = (event: ITodoCheckBoxEvent) => {
    const name = event.target.name
    const checked = event.target.checked
    setEditTodo({ ...editTodo, [name]: checked })
  }

  const putTodo = async (editTodo: TodoType) => {
    try {
      const todoJson = await postTodo(
        process.env.NEXT_PUBLIC_BASE_API + '/todos',
        editTodo,
      )
      console.log(todoJson)

      setTodos([todoJson, ...todos])
      setEditTodo(initialEditTodo)
    } catch (e) {
      console.log(e)
      return
    }
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
          onChange={event => handleTitleChange(event)}
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
        <Checkbox
          checked={editTodo.isDeleted}
          onChange={event => handleIsDeleteChange(event)}
        />
        <br />
      </div>
      <button onClick={() => putTodo(editTodo)} className="btn btn-primary">
        新規作成
      </button>
      {props.todoList.map((todo: TodoType) => {
        return (
          <ol key={todo.todoId}>
            {/* title, content, flg, 編集, 削除, 感情 */}
            <li>
              <Link href={`/components/${[todo.todoId]}`}>{todo.title}</Link>
            </li>
          </ol>
        )
      })}
    </div>
  )
}

export default TodoList
