import React, { useState } from 'react'
import {
  Button,
  Checkbox,
  TextField,
  FormControlLabel,
} from '@material-ui/core'
import { TodoType } from '@/types/type'
import Link from 'next/link'
// eslint-disable-next-line no-restricted-imports
import style from '../styles/_todo_form.module.scss'

// 各Todoの編集・更新画面
const EditTodo = () => {
  const initialEditTodo: TodoType = {
    id: '',
    title: '',
    content: '',
    isDeleted: false,
  }
  // storeからeditする対象のtodoを取得
  const [editState, setEditState] = useState(initialEditTodo)

  const handleTitleChange = (value: string) => {
    setEditState({ ...editState, ['title']: value })
  }
  const handleContentChange = (value: string) => {
    setEditState({ ...editState, ['content']: value })
  }

  const handleIsDeleteChange = (checked: boolean) => {
    setEditState({ ...editState, ['isDeleted']: checked })
  }

  return (
    <div className={style.todoForm}>
      <TextField
        className={style.todoForm__title}
        label="タイトル"
        variant="outlined"
        onChange={event => handleTitleChange(event.target.value)}
      />
      <TextField
        className={style.todoForm__content}
        label="内容"
        multiline
        variant="outlined"
        onChange={event => handleContentChange(event.target.value)}
        rows={5}
        rowsMax={10}
      />
      <FormControlLabel
        label="削除"
        control={
          <Checkbox
            color="primary"
            checked={editState.isDeleted}
            onChange={event => handleIsDeleteChange(event.target.checked)}
          />
        }
        labelPlacement="start"
      />

      <div>
        <Button
          className={style.todoForm__put}
          variant="contained"
          color="primary">
          更新
        </Button>
        <Link href="/" passHref>
          <Button
            className={style.todoForm__back}
            variant="contained"
            color="secondary">
            もどる
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default EditTodo
