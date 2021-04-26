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
import { Checkbox, Divider } from '@material-ui/core'
import { DataGrid, GridColDef } from '@material-ui/data-grid'
import router from 'next/router'
// eslint-disable-next-line no-restricted-imports
import style from '../styles/_todolist.module.scss'

const TodoList: React.FC<IProps> = (props: IProps) => {
  const initialEditTodo: TodoType = {
    id: '',
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
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'No', width: 100, disableColumnMenu: true },
    {
      field: 'title',
      width: 250,
      headerName: 'タイトル',
      disableColumnMenu: true,
    },
    {
      field: 'content',
      headerName: '内容',
      width: 430,
      disableColumnMenu: true,
    },
  ]
  return (
    <div>
      <div className="container">
        <input
          className="form-control"
          type="text"
          name="title"
          placeholder="タイトル"
          value={editTodo.title}
          onChange={event => handleTitleChange(event)}
          required
        />
        <br />
        <textarea
          className="form-control"
          name="content"
          placeholder="内容"
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
      <Divider className={style.todoList__divider} />
      <div className={style.todoList__dataGrid}>
        <DataGrid
          rows={props.todoList}
          columns={columns}
          pageSize={5}
          loading={props.todoList.length === 0}
          onRowClick={row => router.push(`/${row.id}`)}
          autoHeight={true}
          columnBuffer={0}
          hideFooterRowCount
        />
      </div>
    </div>
  )
}

export default TodoList
