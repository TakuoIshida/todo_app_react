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
  const initialNewTodo: TodoType = {
    id: '',
    title: '',
    content: '',
    isDeleted: false,
  }
  // titleのみ取得でＯＫ
  const [todos, setTodos] = useState([] as TodoListType)
  const [newTodo, setNewTodo] = useState(initialNewTodo)

  const handleTitleChange = (value: string) => {
    setNewTodo({ ...newTodo, ['title']: value })
  }
  const handleContentChange = (value: string) => {
    setNewTodo({ ...newTodo, ['content']: value })
  }

  const handleIsDeleteChange = (checked: boolean) => {
    setNewTodo({ ...newTodo, ['isDeleted']: checked })
  }

  const putTodo = async (newTodo: TodoType) => {
    try {
      // POSTする前にComprehendを入れてレスポンスの点数を受け取る
      // 点数を基に感情を４パターンに分ける
      // ４パターンに分けた結果をnewTodoに追加する
      const todoJson = await postTodo(
        process.env.NEXT_PUBLIC_BASE_API + '/todos',
        newTodo,
      )
      console.log(todoJson)

      setTodos([todoJson, ...todos])
      setNewTodo(initialNewTodo)
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
          value={newTodo.title}
          onChange={event => handleTitleChange(event.target.value)}
        />
        <TextField
          className={style.todoForm__content}
          label="内容"
          multiline
          variant="outlined"
          value={newTodo.content}
          onChange={event => handleContentChange(event.target.value)}
          rows={5}
          rowsMax={10}
        />
        <FormControlLabel
          label="削除"
          control={
            <Checkbox
              checked={newTodo.isDeleted}
              onChange={event => handleIsDeleteChange(event.target.checked)}
            />
          }
          labelPlacement="start"
        />

        <Button
          onClick={() => putTodo(newTodo)}
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
