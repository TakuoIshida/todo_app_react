import { IProps, TodoListType, TodoType } from '@/types/type'
import { postTodo } from '@/utils/functions'
import React, { useState } from 'react'
import {
  Checkbox,
  Divider,
  TextField,
  Button,
  FormControlLabel,
} from '@material-ui/core'
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

  const handleTitleChange = (value: string) => {
    setEditTodo({ ...editTodo, ['title']: value })
  }
  const handleContentChange = (value: string) => {
    setEditTodo({ ...editTodo, ['content']: value })
  }

  const handleIsDeleteChange = (checked: boolean) => {
    setEditTodo({ ...editTodo, ['isDeleted']: checked })
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
      <div className={style.todoForm}>
        <TextField
          className={style.todoForm__title}
          label="タイトル"
          variant="outlined"
          value={editTodo.title}
          onChange={event => handleTitleChange(event.target.value)}
        />
        <TextField
          className={style.todoForm__content}
          label="内容"
          multiline
          variant="outlined"
          value={editTodo.content}
          onChange={event => handleContentChange(event.target.value)}
          rows={5}
          rowsMax={10}
        />
        <FormControlLabel
          label="削除"
          control={
            <Checkbox
              checked={editTodo.isDeleted}
              onChange={event => handleIsDeleteChange(event.target.checked)}
            />
          }
          labelPlacement="start"
        />

        <Button
          onClick={() => putTodo(editTodo)}
          className={style.todoForm__put}
          variant="contained"
          color="primary">
          新規作成
        </Button>
      </div>
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
